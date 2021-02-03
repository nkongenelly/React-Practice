import React, { useState, useEffect, useContext, useCallback } from "react";
import {
    makeStyles,
    createStyles,
    Theme,
    withStyles,
    WithStyles,
  } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { styles } from "./MysiteStyle";
import { UserContext } from "../context/UserContext";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import CropUtility from "../utils/CropUtility";
import CoverComponent from "./CoverComponent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import imageCompression from "browser-image-compression";
import eventImg from "../assets/images/eventsPlaceholder.png";
import { classicNameResolver } from "typescript";
import ProfileComponent from "./ProfileComponent";
import "./coverStyles.css";


export interface ChooseFromCollectionProps {
    showProfile: boolean; separateProfile?: boolean;
    CoverComponentClassName?: any; ProfileComponentClassName?: any; editImageStyle?:any; flexStyle?: any;
    fetchStudio: any; purpose: string; 
    onClick:(imageSrcCovers?:any, imageSrcProfiles?:any)=> void;
    coverImg?:any; profileImg?: any; studioId?:string;
    loading: (coverld: boolean, profileld: boolean)=> void;
    open: (str?:any)=>boolean;
}

 
const ChooseFromCollection: React.SFC<ChooseFromCollectionProps> = (props) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "multipart/form-data");

  const [profile, setProfile] = useState("");
  const [cover, setCover] = useState("");
  const [addWhichPhoto, setAddWhichPhoto] = useState("")
  
  interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
  }

  const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle
        disableTypography
        className={classes.dialogRoot}
        {...other}
      >
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const DialogContent = withStyles((theme: Theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

  const DialogActions = withStyles((theme: Theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

  const useStyles = makeStyles(styles);
  const classes = useStyles();

  //Dialog Box open handle
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setOpenModal(props.open(false));
  };
  const [imageChoice, setImageChoice] = useState("cover")
  const [cropShape, setCropShape] = useState("rect");
  const [cropAspect, setCropAspect] = useState(7/4);
  const [showGrid, setShowGrid] = useState(true);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState("")
  const [croppedImageCover, setCroppedImageCover] = useState("")
  const [croppedImager, setCroppedImager] = useState({})
  const [croppedImageProfile, setCroppedImageProfile] = useState("")
  const [imageSrcC, setImageSrcC] = useState("")
  const [imageTile, setImageTile] = useState("")
  const [imageSrcP, setImageSrcP] = useState("")
  const [imageSrcCover, setImageSrcCover] = useState("")
  const [imageSrcProfile, setImageSrcProfile] = useState("")
  const [showGuide, setShowGuide] = useState(false);
  const [openCropper, setOpenCropper] = useState(false);
  const [uploadCover, setUploadCover] = useState(false);
  const handleCloseCropper = () => {
    setOpenCropper(false);
    setShowGuide(true);
    setCoverLoading(false);
    setProfileLoading(false);
    props.loading(coverLoading, profileLoading)
  };
  const handleOpenCropper = () => {
    setOpenCropper(true);
    props.loading(coverLoading,profileLoading)
  };
  //coverLoading
  const [coverLoading, setCoverLoading] = useState(false);
  //profileLoading
  const [profileLoading, setProfileLoading] = useState(false);

  //Data from roles api set in context
  const { data: userData, setData } = useContext(UserContext);
  //fetching data for current page
  const [state, setState] = useState({
    data: null,
  } as any);

  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => { 
    if(props.purpose=="event"){
      setCover(((props.coverImg == "") || (props.coverImg == null) || (props.coverImg == undefined) ? eventImg : props.coverImg)); 
    }
    else if(props.purpose=="studio"){
      setCover(((props.coverImg == "") || (props.coverImg == null) || (props.coverImg == undefined) ? "" : props.coverImg));
      setProfile(((props.profileImg == "") || (props.profileImg == null) || (props.profileImg == undefined) ? "" : props.profileImg));
      setImageSrcCover(((props.coverImg == "") || (props.coverImg == null) || (props.coverImg == undefined) ? "" : props.coverImg));
      setImageSrcProfile(((props.profileImg == "") || (props.profileImg == null) || (props.profileImg == undefined) ? "" : props.profileImg));    
    }
    
    if (userData) {
      fetch(props.fetchStudio)
        .then((res) => res.json())
        .then((res) => {
          setState({ data: res });
          if (props.purpose == "event"){
            setEvent({
              cover_photo_url: res.props.resBody.cover_photo_url == "" ? cover : res.props.resBody.cover_photo_url,
            });
          }
          else if (props.purpose == "studio"){
            setStudio({
              profile_photo_url: res.studioProfile.profile_photo_url,
              cover_photo_url: res.studioProfile.cover_photo_url ,
            });

          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
    setOpen(props.open())
    setOpenModal(props.open())
  }, [userData, props]);

  const [studio, setStudio] = useState<any>({
    profile_photo_url: profile,
    cover_photo_url: cover,
  });
  const [event, setEvent] = useState<any>({
    cover_photo_url: cover,
  });

  const onClose = useCallback(() => {
    // setCroppedImage(null)
  }, [])


 
  ChooseFromCollection.prototype = {
    handleImageUpload:async function(event: any, imageFile: File, str: string) {
      setOpen(false);
      setOpenModal(props.open(false));
      setImageTile("")

      var imageFileSrc = new File([imageFile], "meditation.jpg", {type:"image/jpeg"});
      imageFile = (imageFile == null? event.target.files[event.target.files.length - 1] : imageFileSrc);
      // setCoverLoading(true);
      str === "cover" ? setCoverLoading(true) : setProfileLoading(true);

      setShowGuide(true);
      props.loading(coverLoading, profileLoading);

      if (str === "cover") {
        setCropAspect(7/4);
        setOpen(false);
        setOpenModal(props.open(false));
        // setCover(URL.createObjectURL(event.target.files[event.target.files.length - 1]));
        setImageSrcC(imageFile == null? URL.createObjectURL(event.target.files[event.target.files.length - 1]) : URL.createObjectURL(imageFileSrc));
        setImageTile("")
        setImageChoice("cover")
        setCropShape("rect");
        setShowGrid(true);
      }
      else if (str === "profile") {
        setCropAspect(1);
        setOpen(false);
        setOpenModal(props.open(false));
        // setProfile(URL.createObjectURL(event.target.files[event.target.files.length - 1]));
        setImageSrcP(imageFile == null? URL.createObjectURL(event.target.files[event.target.files.length - 1]) : URL.createObjectURL(imageFileSrc));
        setImageChoice("profile")
        setCropShape("round");
        setShowGrid(false);
      }
      let options = {
        maxSizeMB: 3,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      imageCompression(imageFile, options)
        .then(async function (compressedFile) {
          var formdata = new FormData();
          formdata.append("uploadFile", compressedFile, "meditation.jpg");
          if (userData) {
            fetch("../api/studio/upload", {
              method: "POST",
              body: formdata,
              redirect: "follow"
            })
              .then((res) => res.json())
              .then(async (res) => {
                setCoverLoading(false);
                setProfileLoading(false);
                if (str === "cover") {
                  var coverSet =  res.url
                  setCover(coverSet);
                  setImageSrcC(coverSet);
                  setImageTile("")
                  props.onClick(coverSet, "");
                  ChooseFromCollection.prototype.editImage(event, "cover");
                  // alert(coverSet)
                } else if (str === "profile") {
                  var profileSet = await res.url
                  setProfile(profileSet);
                  setImageSrcP(profileSet)
                  props.onClick("",profileSet);
                  ChooseFromCollection.prototype.editImage(event, "profile")
                }
                props.loading(coverLoading, profileLoading)
              })
              .catch((e) => {
                if (str === "cover") {
                  setCoverLoading(false);
                } else if (str === "profile") {
                  setProfileLoading(false);
                }
                props.loading(coverLoading, profileLoading)
              });
          }
          else{
            setCoverLoading(false);
            setProfileLoading(false);
            props.loading(coverLoading, profileLoading)
          }
        })
        .catch(function (error) {
          console.log("ERROR COMPRESING = ", error)
          setCoverLoading(false);
          setProfileLoading(false);
          props.loading(coverLoading, profileLoading)
        });
    },

    editImage: function(event: any, str: string) {
      setShowGuide(true);
      if (str === "cover") {
        setShowGrid(true);
        setImageChoice("cover")
        setCropShape("rect");
        setShowGrid(true)
      }
      else if (str === "profile") {
        setShowGrid(true);
        setImageChoice("profile")
        setCropShape("round");
        setShowGrid(false);
      }
    }
}
    return ( 
      <div className={props.separateProfile ? classes.separateProfileFlex : ""}>
        <CoverComponent className={props.CoverComponentClassName}
          imageSrcCover={()=>{ 
            if(imageSrcC === "" && croppedImageCover === "" && imageTile === ""){
              return cover }
            if(croppedImageCover === "" && imageTile !== ""){
                return imageTile }
            else if (croppedImageCover == "" && imageSrcC != ""){ 
              return imageSrcC}
            else if(croppedImageCover != "" && imageSrcC != ""){
              return croppedImageCover}
            else {
              return croppedImageCover}
            
          }}
          imageSrcProfile={()=>{
            if(imageSrcP == "" && croppedImageProfile == "" && props.showProfile === true) {
              return profile }
            else if (croppedImageProfile == "" && imageSrcP != "" && props.showProfile === true){ 
              return imageSrcP}
            else if(croppedImageProfile != "" && imageSrcP != "" && props.showProfile === true){
              return croppedImageProfile}
            // else if (props.showProfile === true) {
            //   return croppedImageProfile}
              // else if (props.showProfile === false){ return ""}
          }}
          classNameProfile={props.showProfile? props.ProfileComponentClassName: '' }
            onClick={(str)=>{
              handleOpenCropper()
              setAddWhichPhoto(str)
              setModalShow(true);
              if (str === "cover"){
                setImageChoice("cover")
                setCropShape("rect");
                setCropAspect(7/4);
                setShowGrid(true);
                setImageSrcC(imageSrcC ===""? (imageTile === "" ? imageSrcCover : imageTile) : (imageTile === "" ? imageSrcC : imageTile));
                // setCroppedImageCover(croppedImageCover);
              }
              else if (str === "profile"){
                setImageChoice("profile")
                setCropShape("round");
                setCropAspect(1);
                setShowGrid(false);
                setImageSrcP(imageSrcP ==""? imageSrcProfile:imageSrcP);
                // setCroppedImageProfile(croppedImageProfile);
              }
              if (str =="addCover"){
                setOpen(true)
                setOpenModal(true);
                setImageChoice("cover")
                setCropShape("rect");
                setCropAspect(1);
                setShowGrid(false);
              }
            }}
          
              attachProfile={props.showProfile}
              separateProfile={props.separateProfile}
              editImageStyle={props.editImageStyle}
              coverLoading={coverLoading}
          />
          {props.separateProfile ? 
            (
              <ProfileComponent
              className={props.ProfileComponentClassName}
              separateProfile={props.separateProfile}
                onProfileClick={(str) => {
                  handleOpenCropper()
                  setAddWhichPhoto(str)
                  if (str === "profile"){
                    setModalShow(true);
                    handleOpenCropper()
                    setImageChoice("profile")
                    setCropShape("round");
                    setCropAspect(1);
                    setShowGrid(false);
                    setImageSrcP(imageSrcP ==""? imageSrcProfile:imageSrcP);
                  }
                  if (str =="addProfile"){
                    // setOpen(true)
                    setOpenModal(true);
                  }
                }}
                // imageSrcProfile={()=>props.separateProfile ?
                  imageSrcProfile={()=>{
                    if(imageSrcP == "" && croppedImageProfile == "") {
                      return profile }
                    else if (croppedImageProfile == "" && imageSrcP != "" ){ 
                      return imageSrcP}
                    else if(croppedImageProfile != "" && imageSrcP != ""){
                      return croppedImageProfile}
                    // else if (props.separateProfile === true) {
                    //   return croppedImageProfile}
                  }} 
                  profileLoading={profileLoading}
              />
            ): ""
          }

      {/* HOW TO PASS CROPPED COVER AND PROFILE ONSUBMIT */}
        {openCropper ?
        <Modal
            open={modalShow}
            className={classes.modal}
        >
            <Paper elevation={3} className={classes.coverImgPaper} 
            style={{backgroundRepeat: "no-repeat", width: '800px',}}
            onClick={()=>{
                setShowGuide(false);
            }}>
            <CropUtility
                imageChoice={imageChoice}
                shape={cropShape}
                aspect={cropAspect}
                imageSrc={imageChoice == "cover" ? (imageTile === "" ? imageSrcC : imageTile)  : imageSrcP}
                className={classes.cropContainer}
                showGrid={showGrid}
                handleCloseCropper={handleCloseCropper}
                showGuide={showGuide}
                getCroppedImage={(str,img)=>{
                  handleCloseCropper()
                  setOpen(false);
                  setOpenModal(props.open(false));
                  setShowGuide(true);
                  if(str == "cover"){
                    setCover(URL.createObjectURL(img));
                    setCroppedImageCover(URL.createObjectURL(img));
                    ChooseFromCollection.prototype.handleImageUpload(null,img, "cover")
                    setCoverLoading(false);
                  }
                  else if (str == "profile"){
                    setProfile(img);
                    setCroppedImageProfile(URL.createObjectURL(img));
                    ChooseFromCollection.prototype.handleImageUpload(null,img, "profile")
                    setProfileLoading(false);
                  }
                  props.loading(coverLoading, profileLoading)
                }}
                loading={(coverld,profileld) => {
                  props.loading(coverld, profileld);
                }}
                initialLoading={imageChoice == "cover" ? coverLoading : profileLoading}
            />
            </Paper>

        </Modal> 
        :""}
        {/* {open ? */}
        <Dialog
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          open={openModal}
          fullWidth={true}
          maxWidth={"md"}
          >
         <DialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
          >
              Select an Image
          </DialogTitle>
          <DialogContent dividers>
              <div className={classes.photos}>
              {(process.env.REACT_APP_COVER_IMG_COLLECTION || "")
                  .split(",")
                  .map((tileUrl, i) => (
                  <img
                          onClick={()=>{
                            setImageTile(tileUrl)
                            props.onClick(tileUrl)
                            setOpen(false);
                            setOpenModal(props.open(false));
                          }}
                          className={classes.photosImg}
                          src={tileUrl}
                          alt={"Cover Image Tile"}
                  />
                  ))}                      
              </div>
          </DialogContent> 
          <DialogActions>
            <FormControl fullWidth>
              <input
                  accept="image/*"
                  className={classes.input}
                  id="cover-image-upload"
                  type="file"
                  multiple
                  onChange={(e) =>{
                    (((addWhichPhoto === "addProfile") || (addWhichPhoto === "profile") ) ?  setProfileLoading(true) :  setCoverLoading(true))                  
                    ChooseFromCollection.prototype.handleImageUpload(e, null,
                      ((props.separateProfile) && ((addWhichPhoto === "addProfile") || (addWhichPhoto === "profile") ) ? "profile" : "cover"))
                  }}
              /> 
              {coverLoading ? <CircularProgress /> : ""}

              <label htmlFor="cover-image-upload">
                  <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  >
                  My Computer
              </IconButton>
              </label>
            </FormControl>
          </DialogActions>
        </Dialog>
        {/* // :""}  */}
      </div>

     );
}
 
export default ChooseFromCollection;