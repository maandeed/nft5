import { useState } from "react";
import { useForm } from 'react-hook-form'
import { Paper, TextField } from '@material-ui/core'
import { Button } from '../../globalStyles'
import {
    InputContainer,
    useStyles
} from './AddAuctionForm.style'

const AddAuctionForm = (props) => {

    const [fileInputState, setFileInputState] = useState("");
    const [previewSource, setPreviewSource] = useState("");
    const [selectedFile, setSelectedFile] = useState();
    const { register, handleSubmit, setFocus } = useForm()
    const classes = useStyles();
    console.log(`in add auction form seller ${props.seller}`)

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
        console.log(`target ${fileInputState} ${e.target.value} ${JSON.stringify(file)}`)
    };
    
      const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPreviewSource(reader.result);
        };
        setFocus("image");
    };

    return ( 
        <div className={classes.root}>
            <InputContainer>
                <Paper className={classes.paper}>
                    <TextField id="seller" label="Seller" InputLabelProps={{ shrink: true }} fullWidth disabled
                        name='seller' variant="outlined" value={props.seller} className={classes.margin} />
                </Paper>

                <form className="form" onSubmit={handleSubmit(props.addAuction)}>
                    <Paper className={classes.paper}>
                        <TextField id='title' label="Auction Title" InputLabelProps={{ shrink: true }} fullWidth
                            name='title' {...register('title')} variant="outlined" className={classes.margin} />
                        <TextField id="description" label="Description" InputLabelProps={{ shrink: true }} fullWidth
                            name='description' {...register('description')} variant="outlined" multiline rows={4} className={classes.margin} />
                    </Paper>
                    <Paper className={classes.paper}>
                        <TextField id="fileInput" type="file" InputLabelProps={{ shrink: true }} fullWidth
                            name="fileInput" variant="outlined" onChange={handleFileInputChange} value={fileInputState} className={classes.margin} />
                        {previewSource && (
                            <img src={previewSource} alt="selected" style={{ height: "450px" }} className={classes.margin} />
                         )}
                    </Paper>
                    <Paper className={classes.paper}>
                        <TextField id='image' label="Image selected" InputLabelProps={{ shrink: true }} value={fileInputState}
                            name='image' {...register('image')} variant="outlined" className={classes.margin} />
                        <TextField id='startbid' label="Starting Bid" InputLabelProps={{ shrink: true }} 
                            name='startbid' {...register('startbid')} variant="outlined" className={classes.margin} />
                        <TextField id='duration' label="Duration" InputLabelProps={{ shrink: true }} 
                            name='duration' {...register('duration')} variant="outlined" className={classes.margin} />
                    </Paper>
                    <Button Small fontBig
                        id="submitButton"
                        type="submit">
                        Add Painting
                    </Button>
                </form>
            </InputContainer>
        </div>
    );
}
 
export default AddAuctionForm;