import { useState } from 'react';
import { Button, TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import { Rating } from '@mui/material';
import useStyles from './styles';
import { doc, updateDoc, getDoc, setDoc, arrayUnion} from "firebase/firestore"; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {db, storage} from '../../src/config/firebase-config';
import {UserAuth} from '../../src/context/AuthContextProvider';

// eslint-disable-next-line react/prop-types, no-unused-vars
const ReviewForm = ({ onSubmit, onCancel, placeDetails, setPlaceDetails }) => {
    const classes = useStyles()
    const [rating, setRating] = useState(0);
    const [visitDate, setVisitDate] = useState('');
    const [companionship, setCompanionship] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [title, setTitle] = useState('');
    const [photo, setPhoto] = useState(null);
    const {user} = UserAuth();

    const getDates = () => {
        const options = [];
        const today = new Date();
        const currentYear = today.getFullYear();
        let currentMonth = today.getMonth();
        for (let year = currentYear; year >= 2022; year--) {
        for (let month = currentMonth; month >= 0; month--) {
                options.push(new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' }));
                currentMonth = 12;

            }
        }
        return options;
    };

    const handlePhotoChange = (event) => {
        setPhoto(event.target.files[0]);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
      
        const reviewId = `review_${Date.now()}`;
        if(photo ==null) return;
    
        const reviewData = {
            reviewId,
            placeDetails,
            rating,
            visitDate,
            companionship,
            reviewText,
            title,
            photoURL: photo ? await uploadPhotoAndGetURL(photo, reviewId) : ""
        };
        const userReviewsRef = doc(db, "reviews", user.uid)
        try {
            const docSnap = await getDoc(userReviewsRef);
            if (docSnap.exists()) {
                if (reviewData){
                    console.log(reviewData)
                await updateDoc(userReviewsRef, {
                    reviews: arrayUnion(reviewData)
                });
            }
            } else {
                await setDoc(userReviewsRef, { reviews: [reviewData] });
            }
            console.log("Review added successfully");
            setPlaceDetails({})
            onCancel(); 
        } catch (error) {
            console.error("Error adding review:", error);
        }
    };

    async function uploadPhotoAndGetURL(file, reviewId) {
        const fileRef = ref(storage, `reviews/${user.uid}/${reviewId}/${file.name}`);
        await uploadBytes(fileRef, file);
        return getDownloadURL(fileRef);
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <Typography variant="h6">Write a Review</Typography>
            <Box marginY={2}>
                <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                />
            </Box>
            <TextField
                fullWidth
                label="Title for your review"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Write your review"
                variant="outlined"
                multiline
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                margin="normal"
                inputProps={{ minLength: 5 }}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel id="visit-date-label">When did you visit?</InputLabel>
                <Select
                    labelId="visit-date-label"
                    id="visit-date-select"
                    value={visitDate}
                    label="When did you visit"
                    onChange={(e) => setVisitDate(e.target.value)}
                >
                    {getDates().map((date, index) => (
                        <MenuItem key={index} value={date}>{date}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel id="companionship-label">Who did you go with?</InputLabel>
                <Select
                    labelId="companionship-label"
                    id="companionship-select"
                    value={companionship}
                    label="Who did you go with"
                    onChange={(e) => setCompanionship(e.target.value)}
                >
                    {["Business", "Couples", "Family", "Friends", "Solo"].map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                component="label"
                fullWidth
                margin="normal"
                className={classes.buttonStyle}
            >
                Add a photo
                <input
                    type="file"
                    hidden
                    onChange={handlePhotoChange}
                />
            </Button>
            <Button type="submit"  className={classes.buttonStyle} fullWidth>Submit</Button>
            <Button onClick={onCancel} className={classes.buttonStyle}>Cancel</Button>
        </form>
    );
};

export default ReviewForm;
