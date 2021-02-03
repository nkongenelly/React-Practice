import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import { styles } from "./MysiteStyle";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Tooltip from "@material-ui/core/Tooltip";
import React from "react";
import AddAPhotoTwoToneIcon from "@material-ui/icons/AddAPhotoTwoTone";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import MySite from "./MySite";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useState } from "react";
import ChooseFromCollection from "./chooseFromCollection";
import profileImagePlaceHolder from '../assets/images/profileImagePlaceHolder.png';
import EditIcon from '@material-ui/icons/Edit';
import LotusProfile from "../assets/images/lotusProfile.png";

export interface ProfileComponentProps { 
    className: any; imageSrcProfile: () => any;
    onProfileClick: (str: string)=>void; separateProfile?: boolean;
    profileLoading?: boolean;

}
 
const ProfileComponent: React.SFC<ProfileComponentProps> = (props) => {
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const [profileLoading, setProfileLoading] = useState(false);
    const [coverLoading, setCoverLoading] = useState(false);
    return ( 
        <Box
            border={props.separateProfile ? 0 : 10}
            borderColor="white"
            borderRadius={"50%"}
            className={props.className}
            style={{backgroundImage: `url(${props.imageSrcProfile() !== "" ? props.imageSrcProfile() : profileImagePlaceHolder})`,
            backgroundRepeat: "no-repeat"}}
        >
            {" "}
            {/* {props.profileLoading ? <CircularProgress /> : ""} */}
            {props.separateProfile ?
            <div style={{display: "flex", flexDirection:"column", justifyContent: "flex-end"}}>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="profile-image"
                    type="file"
                    multiple
                    onChange={(e) => ChooseFromCollection.prototype.handleImageUpload(e, null, "profile")}
                    disabled={profileLoading || coverLoading}
                />
                <Fab size="small" style={{marginRight: "-50px", marginBottom : "-85px"}} > 
                <label htmlFor="profile-image">                  
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        aria-hidden="true"
                        component="span"
                        disabled={profileLoading || coverLoading} 
                        // onClick={() => {
                        //     props.onProfileClick("addProfile");
                        // }}                      
                    > 
                        <Tooltip title= "Click to add profile photo" placement="bottom">
                            <AddAPhotoTwoToneIcon fontSize="small" />
                        </Tooltip>
                    </IconButton>
                    </label>
                </Fab>
            </div>
       :
       <label htmlFor="profile-image-upload">
            <input
                accept="image/*"
                className={classes.input}
                id="profile-image-upload"
                type="file"
                multiple
                onChange={(e) =>ChooseFromCollection.prototype.handleImageUpload(e, null, "profile")}
                disabled={profileLoading || coverLoading}
            />

            <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                disabled={profileLoading || coverLoading}
            >
                <AddAPhotoTwoToneIcon fontSize="large" />
            </IconButton>
            </label>
            }
            {props.separateProfile?
            <Grid xs={12} md={12} lg={12} className={classes.editImage} item>
                <Fab
                    aria-label="edit"
                    id="cropper" 
                    className={classes.editImage}
                    onClick={() => {
                        props.onProfileClick("profile");
                    }}
                    size={"small"}
                >
                    <Tooltip title= "Click to reposition profile image" placement="bottom">
                        <EditIcon fontSize={"small"}/>                     
                    </Tooltip>
                </Fab>
            </Grid>
            :
            <Grid xs={12} md={12} lg={12} className={classes.preview} item>
                <IconButton
                    aria-label="edit"
                    id="cropper"
                    className={classes.editImage}
                    onClick={() => {
                        props.onProfileClick("profile");
                    }}
                >
                    <Tooltip title="Click to reposition profile image" placement="bottom">
                    <EditOutlinedIcon />
                    
                    </Tooltip>
                </IconButton>
            </Grid> }
            {props.profileLoading ? <CircularProgress /> : ""}
        </Box>

     );
}
 
export default ProfileComponent;