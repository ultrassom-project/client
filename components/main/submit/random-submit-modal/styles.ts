import styled from 'styled-components';

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;

    > div {
        margin-top: 20px;
    }
`;

export const UploadedFilesContainer = styled.div`
    display: flex;
    width: fit-content;
    flex-direction: column;
    align-items: flex-start;
`;

export const UploadedFileNameContainer = styled.div`
    &:hover {
        p {
            color: #ff0000;
        }
        cursor: pointer;
    }
`;

export const FileUploadContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    margin-top: 30px;
`;

export const UploadFileButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
