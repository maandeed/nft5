import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
// import ReactDropzone from "react-dropzone";

export const InputContainer = styled.div`
    background-color: #fff;
    padding: 4rem 0 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 820px) {
        flex-direction: column;
        width: 100%;
    }
`;

export const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 820px) {
        flex-direction: column;
        width: 80%;
   }
`;
export const Subtitle = styled.p`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  color: ${({ lightTextDesc }) => (lightTextDesc ? '#a9b3c1' : '#1c2237')};
`;

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignitems: 'center',
        margin: '10px 20px 20px 20px',
    },
    paper: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: '20px',
        maxWidth: '820px',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        margin: theme.spacing(1), 
//        width: '40ch',
    },
}))