import * as React from 'react';
import Paper from "@material-ui/core/Paper";
import { styles } from "./MysiteStyle";
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import AddAPhotoTwoToneIcon from "@material-ui/icons/AddAPhotoTwoTone";
import AddAPhotoSharpIcon from '@material-ui/icons/AddAPhotoSharp';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import CropUtility from "../utils/CropUtility"
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import { useState } from 'react';
import { useCallback } from 'react';
import ProfileComponent from './ProfileComponent';
import MySite from './MySite';
import coverImagePlaceHolder from '../assets/images/coverImagePlaceHolder.png';
import ChooseFromCollection from './chooseFromCollection';
import CircularProgress from "@material-ui/core/CircularProgress";

export interface CoverComponentProps {
    imageSrcCover: () => any; 
    imageSrcProfile: () => any;
    className: any;  classNameProfile?: any
    onClick:(str:string) => void;
    attachProfile?: boolean; separateProfile?: boolean;
    editImageStyle?:any;
    coverLoading?: boolean;
}
 
const CoverComponent: React.SFC<CoverComponentProps> = (props) => {
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    //coverLoading
    const [coverLoading, setCoverLoading] = useState(false);
    //profileLoading
    const [profileLoading, setProfileLoading] = useState(false);
    
    return ( 
        <Paper elevation={3} className={props.className} style={{
          backgroundImage: `url(${props.imageSrcCover()!== "" ? props.imageSrcCover() : coverImagePlaceHolder})`,
          backgroundRepeat: "no-repeat"}}
        >
           {props.coverLoading ? <CircularProgress /> : ""}
        {props.separateProfile?
          <div style={{display: "flex", flexDirection:"column", justifyContent: "flex-end"}}>
            <Fab size="small" style={{marginRight: "-50px"}} >
            {/* <input
              accept="image/*"
              className={classes.input}
              id="profile-image-upload"
              type="file"
              multiple
              onChange={(e) => ChooseFromCollection.prototype.handleImageUpload(e, null, "cover")}
              disabled={profileLoading || coverLoading}
            /> */}
              <IconButton
                color="primary"
                aria-label="upload picture"
                aria-hidden="true"
                component="span"
                onClick={() => {
                  props.onClick("addCover");
                }}
                disabled={profileLoading || coverLoading}> 
              <Tooltip title= "Click to add cover photo" placement="bottom">
                <AddAPhotoTwoToneIcon fontSize="small" />
              </Tooltip>
       </IconButton>
       </Fab>
        </div>
       :""}
          <div>           
            <Fab
            aria-label="edit"
            id="cropper" 
            onClick={() => {
              props.onClick("cover");
            }}
            size={props.editImageStyle? "small" : "medium"}
            >
              <Tooltip title= "Click to reposition cover image" placement="bottom">
                  <EditIcon fontSize={props.editImageStyle? "small" : "default"}/>
                  
              </Tooltip>
            </Fab>
          </div>
          <div>
                  {/* Profile Image */}
            {props.attachProfile?
              <ProfileComponent
              className={props.classNameProfile}
                onProfileClick={() => {
                  props.onClick("profile");                 
                }}
                imageSrcProfile={()=>props.attachProfile ? props.imageSrcProfile() : ""}
              />
              :""}
          </div>
        </Paper>

     );
}
 
export default CoverComponent;