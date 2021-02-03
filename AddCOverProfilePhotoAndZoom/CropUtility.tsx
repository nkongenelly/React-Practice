import React, { useState, useEffect, useContext, useCallback } from "react";
import { styles } from "../MySite/MysiteStyle";
import {
  makeStyles,
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Cropper from 'react-easy-crop';
import Slider from "@material-ui/core/Slider";
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import getCroppedImg from "../utils/cropImage";
import CircularProgress from "@material-ui/core/CircularProgress";

export interface CropUtilityProps {
  shape: any; imageSrc: string; aspect: number; showGrid: boolean;
  className: any; showGuide: boolean;
  handleCloseCropper: any;
  imageChoice: string;
  getCroppedImage:(str:string, img:any)=>void;
  loading: (coverld: boolean, profileld: boolean)=> void;
  initialLoading? :boolean;
}

const CropUtility: React.SFC<CropUtilityProps> = (props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1.5)
  const [imageSrc, setImageSrc] = useState(props.imageSrc)
  const [showGuide, setShowGuide] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    props.loading(true, false)
    setLoading(true)
    try {
      const croppedImage: any = await getCroppedImg(
        props.imageSrc,
        croppedAreaPixels,
        rotation
      )
      props.loading(false, false)
      setLoading(false)
      if (props.imageChoice === "cover") {
        props.getCroppedImage("cover",croppedImage);
        setShowGuide(false);
      }
      else if (props.imageChoice === "profile") {
        props.getCroppedImage("profile",croppedImage);
        setShowGuide(false);
      }
    
    } catch (e) {
      props.loading(false, false)
      setLoading(false)
      console.error(e)
    }
  }, [imageSrc, croppedAreaPixels, rotation])

  return (
      <div className={props.className}>
        <div>
          <Cropper
            image={props.imageSrc}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={props.aspect}
            cropShape={props.shape}
            showGrid={props.showGrid}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            // crossorigin={null}
          />
          {loading ? <CircularProgress /> : ""}
          {props.initialLoading ? <CircularProgress /> : ""}
          <Button
          onClick={showCroppedImage}
            variant="contained"
            color="primary"
            className={classes.cropButton }
          >
            Show Result
          </Button>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={props.handleCloseCropper}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.editDrag}>
          {props.showGuide ?
            <h3 className={classes.dragImage}>
              <ZoomOutMapIcon />
                Drag to reposition or zoom with the slider below.
            </h3>
            : ""}
        </div>
        <div className={classes.controls}>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              className={classes.slider}
              onChange={(e, zoom: any) => setZoom(zoom)}
            />
        </div>
      </div>
    );
  
}
export default CropUtility;
