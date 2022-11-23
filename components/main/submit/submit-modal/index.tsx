import React, { useState, useCallback, useMemo } from 'react';
import { Modal, Typography, TextField, Box, MenuItem, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Send } from '@mui/icons-material';
import { ReconstructionAlgorithmType } from '../../../../models/reconstruction-algorithm-type';
import { ReconstructionDimension } from '../../../../models/reconstruction-dimension';
import { convertCsvToNumberArray } from '../../../../utils/file-reader';
import { FileUploadContainer, FormContainer } from './styles';
import { ReconstructionSubmition } from '../../../../models/reconstruction-submition';
import { applySignalGain } from '../../../../utils/signal-gain';

interface SubmitModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ReconstructionSubmition) => Promise<void>;
}

const SubmitModal: React.FC<SubmitModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [userId, setUserId] = useState('');
    const [algorithm, setAlgorithm] = useState<ReconstructionAlgorithmType>(ReconstructionAlgorithmType.CGNE);
    const [dimension, setDimension] = useState<ReconstructionDimension>(ReconstructionDimension['30x30']);
    const [signalGain, setSignalGain] = useState(false);
    const [signalVectorFile, setSignalVectorFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.currentTarget.files) {
            return;
        }

        setSignalVectorFile(event.currentTarget.files[0]);
    }, []);

    const submitButtonEnabled = useMemo((): boolean => {
        if (userId === '' || !signalVectorFile) {
            return false;
        }

        return true;
    }, [userId, signalVectorFile]);

    const handleSubmitPress = useCallback(async () => {
        setLoading(true);

        if (signalVectorFile === null) {
            return;
        }

        let signalVector = await convertCsvToNumberArray(signalVectorFile);

        if (signalGain) {
            applySignalGain(signalVector, dimension);
        }

        await onSubmit({
            userId,
            algorithm,
            dimension,
            signalVector,
            signalGain,
        });

        setLoading(false);
        onClose();
    }, [userId, algorithm, dimension, signalGain, signalVectorFile, onSubmit, onClose]);

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
                        label="algorithm"
                        variant="outlined"
                        select
                        value={algorithm}
                        onChange={(e) => setAlgorithm(e.target.value as ReconstructionAlgorithmType)}
                    >
                        <MenuItem value={ReconstructionAlgorithmType.CGNE}>{ReconstructionAlgorithmType.CGNE}</MenuItem>
                        <MenuItem value={ReconstructionAlgorithmType.CGNR}>{ReconstructionAlgorithmType.CGNR}</MenuItem>
                    </TextField>

                    <TextField
                        color="primary"
                        label="dimension"
                        variant="outlined"
                        select
                        value={dimension}
                        onChange={(e) => setDimension(parseInt(e.target.value) as ReconstructionDimension)}
                    >
                        <MenuItem value={ReconstructionDimension['30x30']}>{ReconstructionDimension['30x30']}</MenuItem>
                        <MenuItem value={ReconstructionDimension['60x60']}>{ReconstructionDimension['60x60']}</MenuItem>
                    </TextField>

                    <TextField
                        color="primary"
                        label="signal gain"
                        variant="outlined"
                        select
                        value={signalGain}
                        onChange={(e) => setSignalGain(e.target.value === 'true')}
                    >
                        <MenuItem value={'false'}>No</MenuItem>
                        <MenuItem value={'true'}>Yes</MenuItem>
                    </TextField>

                    <FileUploadContainer>
                        {signalVectorFile && <Typography>{signalVectorFile.name}</Typography>}

                        <Button variant="outlined" component="label" color="primary">
                            {signalVectorFile ? 'Change Signal File' : 'Upload Signal File'}
                            <input type="file" accept=".csv" onChange={handleFileUpload} hidden />
                        </Button>
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

export default SubmitModal;
