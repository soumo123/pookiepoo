import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import axiosInstance from '../../axiosInstance.js';
import { ToastContainer, toast } from 'react-toastify';

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor: grey[100],
}));

const StyledBox = styled('div')(({ theme }) => ({
    backgroundColor: '#fff',
}));

const Puller = styled('div')(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: grey[300],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

function Interest(props) {
    const { window } = props;
    const [open, setOpen] = React.useState(false);
    const [interests, setInterests] = React.useState([
        { id: 1, name: "Travel", selected: false },
        { id: 2, name: "Music", selected: false },
        { id: 3, name: "Dancing", selected: false },
        { id: 4, name: "Fitness", selected: false },
        { id: 5, name: "Foodie", selected: false },
        { id: 6, name: "Photography", selected: false },
        { id: 7, name: "Gaming", selected: false },
        { id: 8, name: "Reading", selected: false },
        { id: 9, name: "Pets", selected: false },
        { id: 10, name: "Movies", selected: false },
        { id: 11, name: "Outdoors", selected: false },
        { id: 12, name: "Art", selected: false },
        { id: 13, name: "Coffee", selected: false },
        { id: 14, name: "Netflix", selected: false },
        { id: 15, name: "Writing", selected: false },
        { id: 16, name: "Yoga", selected: false },
        { id: 17, name: "Cooking", selected: false },
        { id: 18, name: "Hiking", selected: false },
        { id: 19, name: "Spirituality", selected: false },
        { id: 20, name: "Volunteering", selected: false },
        { id: 21, name: "Fashion", selected: false },
        { id: 22, name: "Shopping", selected: false },
        { id: 23, name: "Cycling", selected: false },
        { id: 24, name: "Tech", selected: false },
        { id: 25, name: "Astrology", selected: false },
        { id: 26, name: "Board Games", selected: false },
        { id: 27, name: "Stand-up Comedy", selected: false },
        { id: 28, name: "Makeup", selected: false },
        { id: 29, name: "Cars & Bikes", selected: false },
        { id: 30, name: "Swimming", selected: false },
        { id: 31, name: "Skincare", selected: false },
        { id: 32, name: "Blogging", selected: false },
        { id: 33, name: "Live Music", selected: false },
        { id: 34, name: "Crafting", selected: false },
        { id: 35, name: "Martial Arts", selected: false }
    ]);
    const user_id = localStorage.getItem("user_id")
    // Sync with props.interests
    React.useEffect(() => {
        if (props.interests?.length) {
            const updatedInterests = interests.map(interest => ({
                ...interest,
                selected: props.interests.some(pi => pi.name === interest.name)
            }));
            setInterests(updatedInterests);
        }
    }, [props.interests]);

    const toggleInterest = (index) => {
        const newInterests = [...interests];
        newInterests[index].selected = !newInterests[index].selected;
        setInterests(newInterests);
    };

    const selectedCount = interests.filter(interest => interest.selected).length;
    const totalCount = interests.length;

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const handleSave = async () => {
        // Add your save logic here
        const filterinterests = interests.filter(i => i.selected)
        console.log("interests new", filterinterests)
        await hanldeSaveApi(filterinterests)
    };

    const hanldeSaveApi = async (data) => {
        try {
            const res = await axiosInstance.patch(`/updateinfo?user_id=${user_id}`, {
                interests:data
            });
            if (res.status === 200) {
                toast.success("Saved sucessfully",
                    {
                        autoClose: 2000,
                        position: "top-center",
                    }
                )
                toggleDrawer(false)();
            }
        } catch (error) {
            console.log(error)
            toast.error("Not Saved",
                {
                    autoClose: 2000,
                    position: "top-center",
                }
            )
        }

    }


    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Root>
            <ToastContainer />
            <div className="interests-list" onClick={toggleDrawer(true)} style={{ background: "#ffff" }}>
                {selectedCount > 0 ? (
                    <Box sx={{ p: 1, cursor: 'pointer' }}>
                        {interests.filter(i => i.selected).map(i => i.name).join(', ')}
                    </Box>
                ) : (
                    <Box sx={{ p: 1, color: grey[500], cursor: 'pointer' }}>Select interests...</Box>
                )}
            </div>

            <SwipeableDrawer
                container={container}
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                keepMounted
            >
                <StyledBox sx={{ height: `calc(100% - ${drawerBleeding}px)` }}>
                    <Puller />
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2
                    }}>
                        <Typography variant="h6">Choose Interests</Typography>
                        <button type="button" className='btn btn-primary' onClick={handleSave}>
                            Save
                        </button>
                    </Box>

                    <Box sx={{
                        maxHeight: '60vh',
                        overflowY: 'auto',
                        px: 2,
                        pb: 2
                    }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 2
                        }}>
                            {/* <Typography variant="subtitle1">Your Interests</Typography> */}
                            <Typography variant="caption" style={{ fontSize: "16px" }}>
                                {selectedCount} of {totalCount} selected
                            </Typography>
                        </Box>

                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '8px'
                        }}>
                            {interests.map((interest, index) => (
                                <Box
                                    key={interest.id}
                                    onClick={() => toggleInterest(index)}
                                    sx={{
                                        px: 1,
                                        py: 0.5,
                                        borderRadius: '16px',
                                        border: '1px solid',
                                        borderColor: interest.selected ? '#ff4757' : grey[300],
                                        bgcolor: interest.selected ? '#ff4757' : 'transparent',
                                        color: interest.selected ? 'primary.contrastText' : 'text.primary',
                                        cursor: 'pointer',
                                        fontSize: '17px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            borderColor: interest.selected ? '#ff4757' : grey[500]
                                        }
                                    }}
                                >
                                    {interest.name}
                                    {interest.selected && <Box component="span" sx={{ ml: 0.5 }}>×</Box>}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    );
}

Interest.propTypes = {
    window: PropTypes.func,
    interests: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired
        })
    )
};

export default Interest;