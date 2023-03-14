import React, {useState} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useNavigate} from 'react-router-dom';
import StyledButton from "../components/Styled/StyledButton";
import {getToken} from "../services/userAtuhService";
import {addProduct} from "../services/ProductService";

import {styled} from '@mui/material/styles';

// Styles for the modal and its contents
const StyledModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});
const StyledBox = styled(Box)({
    backgroundColor: 'white',
    border: '2px solid black',
    padding: '1rem',
});


const StyledHeader = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid black',
    marginBottom: '1rem',
    paddingRight: '1rem',
});


const AddProductModal = (props) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const navigate = useNavigate();

    const handleOpen = () => props.setOpen(true);
    const handleClose = () => {
        setName('');
        setDescription('');
        setImageLink('');
        setMinPrice('');
        props.setOpen(false)
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const token = getToken();
        if (token){
            addProduct(token, name, description, imageLink, minPrice,handleClose,navigate);
        }



       // handleClose();
    };

    return (
        <>

            <StyledModal open={props.open} onClose={handleClose}>
                <StyledBox>

                    <StyledHeader>
                        <h2>Add New Product</h2>
                        <StyledButton
                            variant="contained"
                            onClick={handleClose}
                            icon={"x"}
                        />


                    </StyledHeader>
                    <form onSubmit={onSubmit}>
                        <TextField
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Image Link"
                            value={imageLink}
                            onChange={(e) => setImageLink(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Minimum Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            type="number"
                            InputProps={{inputProps: {min: 0}}}
                            required
                            fullWidth
                        />

                        <StyledButton
                            variant="contained"
                            sx={{
                                margin: "10px"

                            }}
                            text={"Save"}
                            icon={"v"}
                            onClick={onSubmit}

                        >
                            Save
                        </StyledButton>

                        <StyledButton
                            variant="contained"
                            sx={{margin: "10px"}}
                            text={"Cancel"}
                            icon={"x"}
                            onClick={handleClose}
                        >
                            Cancel
                        </StyledButton>


                    </form>
                </StyledBox>
            </StyledModal>
        </>
    );
};


export default AddProductModal;
