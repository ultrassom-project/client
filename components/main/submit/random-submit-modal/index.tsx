import React, { useCallback, useMemo, useState } from 'react';
import { Button, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ReconstructionRandomInput } from '../../../../models/reconstruction-random-input';
import { convertCsvToNumberArray } from '../../../../utils/file-reader';
import {
    FormContainer,
    FileUploadContainer,
    UploadedFilesContainer,
    UploadedFileNameContainer,
    UploadFileButtonContainer,
} from './styles';
import { LoadingButton } from '@mui/lab';
import { Send } from '@mui/icons-material';
import { ReconstructionDimension } from '../../../../models/reconstruction-dimension';
import { ReconstructionInputSignal } from '../../../../models/reconstruction-input-signal';

interface RandomSubmitModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRandomSubmit: (data: ReconstructionRandomInput) => Promise<void>;
}

const RandomSubmitModal: React.FC<RandomSubmitModalProps> = ({ isOpen, onClose, onRandomSubmit }) => {
    const [userId, setUserId] = useState('');
    const [timeInterval, setTimeInterval] = useState('');
    const [signalVectorFiles, setSignalVectorFiles] = useState<File[]>([]);
    const [signalVectorFilesDimensions, setSignalVectorFilesDimensions] = useState<ReconstructionDimension[]>([]);
    const [fileDimension, setFileDimension] = useState<ReconstructionDimension>(ReconstructionDimension['30x30']);
    const [loading, setLoading] = useState(false);

    const handleTimeIntervalChange = useCallback((newValue) => {
        if (newValue === '') {
            setTimeInterval(newValue);
            return;
        }

        if (isNaN(newValue) || isNaN(parseFloat(newValue))) {
            return;
        }

        setTimeInterval(newValue);
    }, []);

    const handleFileUpload = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (!event.currentTarget.files) {
                return;
            }

            if (event.currentTarget.files.length === 0) {
                return;
            }

            setSignalVectorFiles([event.currentTarget.files[0], ...signalVectorFiles]);
            setSignalVectorFilesDimensions([fileDimension, ...signalVectorFilesDimensions]);
        },
        [signalVectorFiles, signalVectorFilesDimensions, fileDimension]
    );

    const handleRemoveFile = useCallback(
        (fileIndex) => {
            const files = [...signalVectorFiles];
            files.splice(fileIndex, 1);

            const filesDimensions = [...signalVectorFilesDimensions];
            filesDimensions.splice(fileIndex, 1);

            setSignalVectorFiles(files);
            setSignalVectorFilesDimensions(filesDimensions);
        },
        [signalVectorFiles, signalVectorFilesDimensions]
    );

    const submitButtonEnabled = useMemo((): boolean => {
        if (userId === '' || timeInterval === '' || signalVectorFiles.length === 0) {
            return false;
        }

        return true;
    }, [userId, timeInterval, signalVectorFiles]);

    const handleSubmitPress = useCallback(async () => {
        setLoading(true);

        const signalVectors: number[][] = [];
        for (const signalVectorFile of signalVectorFiles) {
            signalVectors.push(await convertCsvToNumberArray(signalVectorFile));
        }

        const inputSignals: ReconstructionInputSignal[] = signalVectors.map((signalVector, index) => {
            return {
                signalVector,
                dimension: signalVectorFilesDimensions[index],
            };
        });
        onClose();

        await onRandomSubmit({
            userId,
            timeInterval: parseFloat(timeInterval),
            inputSignals,
        });

        setLoading(false);
    }, [userId, signalVectorFiles, signalVectorFilesDimensions, timeInterval, onRandomSubmit, onClose]);

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                component="form"
                color="primary"
                noValidate
                autoComplete="off"
                sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 4,
                }}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Submit data
                </Typography>

                <FormContainer>
                    <TextField
                        color="primary"
                        label="user id"
                        variant="outlined"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />

                    <TextField
                        color="primary"
                        label="Intervalo de Tempo (segundos)"
                        variant="outlined"
                        value={timeInterval}
                        onChange={(e) => handleTimeIntervalChange(e.target.value)}
                    />

                    <FileUploadContainer>
                        {signalVectorFiles.length !== 0 && (
                            <UploadedFilesContainer>
                                {signalVectorFiles.map((signalVectorFile, index) => (
                                    <UploadedFileNameContainer key={index} onClick={() => handleRemoveFile(index)}>
                                        <Typography>
                                            {signalVectorFile.name} - {signalVectorFilesDimensions[index]}x
                                            {signalVectorFilesDimensions[index]}
                                        </Typography>
                                    </UploadedFileNameContainer>
                                ))}
                            </UploadedFilesContainer>
                        )}

                        <UploadFileButtonContainer>
                            <TextField
                                color="primary"
                                label="dimension"
                                variant="outlined"
                                select
                                value={fileDimension}
                                onChange={(e) => setFileDimension(parseInt(e.target.value) as ReconstructionDimension)}
                            >
                                <MenuItem value={ReconstructionDimension['30x30']}>
                                    {ReconstructionDimension['30x30']}
                                </MenuItem>
                                <MenuItem value={ReconstructionDimension['60x60']}>
                                    {ReconstructionDimension['60x60']}
                                </MenuItem>
                            </TextField>

                            <Button
                                variant="outlined"
                                component="label"
                                color="primary"
                                sx={{
                                    marginTop: 2,
                                }}
                            >
                                Upload Signal File
                                <input type="file" accept=".csv" onChange={handleFileUpload} hidden />
                            </Button>
                        </UploadFileButtonContainer>
                    </FileUploadContainer>

                    <LoadingButton
                        color="primary"
                        variant="outlined"
                        onClick={handleSubmitPress}
                        loading={loading}
                        loadingPosition="end"
                        endIcon={<Send />}
                        disabled={!submitButtonEnabled}
                        sx={{ marginTop: 10 }}
                    >
                        {loading ? 'Loading' : 'Submit'}
                    </LoadingButton>
                </FormContainer>
            </Box>
        </Modal>
    );
};

export default RandomSubmitModal;
