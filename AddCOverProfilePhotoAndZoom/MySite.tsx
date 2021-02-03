import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import EventBus from "../utils/EventBus";
import {
  makeStyles,
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Formik } from "formik";
import imageCompression from "browser-image-compression";
import ButtonBase from "@material-ui/core/ButtonBase";
import { FormHelperText } from "@material-ui/core";
import LotusProfile from "../assets/images/lotusProfile.png";
import UploadProfile from "../assets/images/uploadProfile.png";
import Instagram from "../assets/images/instagram.png";
import Facebook from "../assets/images/facebook.png";
import Youtube from "../assets/images/youtube.png";
import Website from "../assets/images/website.png";
import Twitter from "../assets/images/twitter.png";
import {styles} from "./MysiteStyle";
// import "./coverStyles.css";
import PopularTheme from "../assets/images/Popular.png";
import StandardTheme from "../assets/images/Standard.png";
import AdvanceTheme from "../assets/images/Advance.png";

import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import ChooseFromCollection from "./chooseFromCollection";
import ProfileComponent from "./ProfileComponent";
import Input from "@material-ui/core/Input";

export default function MySite() {
  //profile image and cover image state
  const [profile, setProfile] = useState("");
  const [cover, setCover] = useState("");
  const [displayThemeSlider, setDisplayThemeSlider] = useState(false);
  const [theme, setTheme] = useState("Popular");
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#000000");
 
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
  const history = useHistory();
  //Dialog Box open handle
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  //coverLoading
  const [coverLoading, setCoverLoading] = useState(false);
  //profileLoading
  const [profileLoading, setProfileLoading] = useState(false);

  //Data from roles api set in context

  const { data: userData, setData } = useContext(UserContext);

  console.log("userData", userData);
  //fetching data for current page
  const [state, setState] = useState({
    data: null,
  } as any);

  useEffect(() => {
    if (userData) {
      fetch(`../api/studio/${userData.studio_id}`)
        .then((res) => res.json())
        .then((res) => {
          setState({ data: res });
          setProfile(res.studioProfile.profile_photo_url);
          setCover(res.studioProfile.cover_photo_url);
          setStudio({
            domain: userData.domain,
            status: res.studioProfile.status,
            name: res.studioProfile.name,
            about: res.studioProfile.about,
            city: res.studioProfile.city,
            state: res.studioProfile.state,
            country: res.studioProfile.country,
            insta_link: res.studioProfile.insta_link,
            facebook_link: res.studioProfile.facebook_link,
            youtube_link: res.studioProfile.youtube_link,
            website_link: res.studioProfile.website_link,
            twitter_link:res.studioProfile.twitter_link,
            templateType: res.studioProfile.templateType,
            profile_photo_url: profile,
            cover_photo_url: cover,
            primaryColor: res.studioProfile.primaryColor,
            secondaryColor: res.studioProfile.secondaryColor,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [userData]);

  const isValidWebUrl = (url: string): Boolean => {
    let regEx = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    return regEx.test(url);
  };
  const validSubdomain = function (val: string) {
    var re = /[^a-zA-Z0-9\-]/;
    return !re.test(val);
  };

  const [studio, setStudio] = useState<any>({
    domain: "",
    name: "",
    about: "",
    status: "active",
    city: "",
    state: "",
    country: "",
    insta_link: "",
    facebook_link: "",
    youtube_link: "",
    website_link: "",
    twitter_link:"",
    profile_photo_url: profile,
    cover_photo_url: cover,
  });

  
  const openPreviewPage = (themeName: any) => {
    let url = "";
    switch (themeName) {
      case "popular":
        url = "/popular";
        break;
      case "standard":
        url = "/standard";
        break;
      case "advanced":
        url = "/advance";
        break;
    }
    window.open(url, "_blank");
  };
  console.log("studio", studio);
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          ...studio,
          primaryColor: studio.primaryColor ? studio.primaryColor : "#00549f",
          secondaryColor: studio.secondaryColor
            ? studio.secondaryColor
            : "#a11453",
          templateType: studio.templateType ? studio.templateType : "popular",
        }}
        validate={async (values) => {
          const errors = {} as any;
          if (!values.name) {
            errors.name = "Name is required";
          }
          if (!values.about) {
            errors.about = "Please enter description";
          }

          if (!validSubdomain(values.domain)) {
            errors.domain = "Please enter a valid subdomain";
          }

          if (!values.domain) {
            errors.domain = "Domain name is required";
          }
          if (values.insta_link !== "" && !isValidWebUrl(values.insta_link)) {
            errors.insta_link = "Please enter a valid URL";
          }
          if (
            values.facebook_link !== "" &&
            !isValidWebUrl(values.facebook_link)
          ) {
            errors.facebook_link = "Please enter a valid URL";
          }
          if (
            values.youtube_link !== "" &&
            !isValidWebUrl(values.youtube_link)
          ) {
            errors.youtube_link = "Please enter a valid URL";
          }

          if (
            values.website_link !== "" &&
            !isValidWebUrl(values.website_link)
          ) {
            errors.website_link = "Please enter a valid web URL";
          }

          if (
            values.twitter_link !== "" &&
            !isValidWebUrl(values.twitter_link)
          ) {
            errors.twitter_link = "Please enter a valid twitter URL";
          }

          return errors;
        }}
        onSubmit={(values: any) => {
          values.profile_photo_url = profile;
          values.cover_photo_url = cover;
          values.domain = values.domain.toLowerCase();
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          if (userData) {
            fetch(
              `../api/studio/uniqueDomain/${
                userData.studio_id
              }/${values.domain.toLowerCase()}`
            ).then((res) => {
              if (res.status == 201) {
                if (values.cover_photo_url !== "") {
                  fetch(`../api/studio/${userData.studio_id}`, {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(values),
                    redirect: "follow",
                  })
                    .then((res) => res.json())
                    .then((res) => {
                      if (userData.domain !== values.domain) {
                        let temp = { ...userData };
                        temp.domain = values.domain;
                        setData(temp);
                      }
                      EventBus().dispatch("toast", {
                        message: "Profile Update Successful",
                        success: true,
                      });
                    })
                    .catch((e) => {
                      console.log(e);
                      EventBus().dispatch("toast", {
                        message: "Something went wrong",
                        success: false,
                      });
                    });
                } else {
                  // alert("Please set a cover photo");
                  EventBus().dispatch("toast", {
                    message: "Please set a cover photo",
                    success: false,
                  });
                }
              } else {
                // alert("Please choose a different domain name as this is not available");
                EventBus().dispatch("toast", {
                  message:
                    "Please choose a different domain name as this is not available",
                  success: false,
                });
              }
            });
          }
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            id="my-site-form-1"
            style={{ fontFamily: "Roboto" }}
          >
            <Grid
              container
              justify="space-between"
              className={classes.mainMySite}
            >
              <Grid item xs={6}>
                {" "}
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{
                    fontWeight: "bold",
                    fontFamily: "Roboto",
                    marginBottom: 17,
                  }}
                >
                  My studio
                </Typography>{" "}
              </Grid>
              <Grid item xs={6} style={{ textAlign: "end" }}></Grid>
            </Grid>
            <Typography
              variant="subtitle1"
              gutterBottom
              className={classes.myStudioBasicText}
            >
              Your basic information and branding goes here.
            </Typography>
            <Grid container>
              <Grid item xs={12} sm={12} md={7}  >
                <Grid
                  container
                  className={classes.mystudio_header_main}
                  alignItems="center"
                >
                  <Grid item xs={3} className={classes.mystudio_header_title}>
                    My Studio URL
                  </Grid>
                  <Grid item xs={6}>
                    <input
                      className={`${classes.mystudio_header_input} ${classes.inputOutline}`}
                      placeholder="https://brandname.namaste.fit"
                      type="text"
                      style={{ border: "none",outline:'none' }}
                      required
                      name="domain"
                      id="domain"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.domain}
                      autoComplete="Studio Url"
                      disabled={
                        userData && userData.domain && userData.domain !== ""
                          ? true
                          : false
                      }
                    />
                  </Grid>
                  <Grid item xs={3} className={classes.mystudio_header_url}>
                    .namaste.fit
                  </Grid>
                </Grid>
                {errors.domain ? (
                  <Typography color="error" variant="body1" gutterBottom>
                    {errors.domain}
                  </Typography>
                ) : (
                  ""
                )}
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  style={{
                    fontSize: "14px",
                    marginLeft: "20px",
                    fontFamily: "Roboto",
                    marginBottom: 20,
                    lineHeight: 1.3,
                  }}
                >
                  {`Your published studio URL will be ${
                    process.env.REACT_APP_PROTOCOL
                  }://${
                    values.domain ? values.domain : "brandname"
                  }.namaste.fit and it will be unchangeable.`}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={5}
                style={{ textAlign: "end", margin: "10px 0px" }}
                
              >
                {userData && userData.domain && (
                  <Tooltip
                    title={
                      userData && userData.domain !== ""
                        ? "preview"
                        : "Please publish your site first to preview your site"
                    }
                    placement="bottom"
                  >
                    <Button
                      className={classes.previewButton}
                      href={`${process.env.REACT_APP_PROTOCOL}://${userData.domain}.${process.env.REACT_APP_DOMAIN_NAME}`}
                      // href="/studentPanel"
                      target="_blank"
                    >
                      Go to Website
                    </Button>
                  </Tooltip>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={7} style={{ position: "relative" }}>
                <ChooseFromCollection
                    coverImg={cover} 
                    profileImg={profile}
                    showProfile={false}
                    separateProfile={true}
                    purpose={"studio"}
                    CoverComponentClassName={(values.templateType !== "standard") ? classes.mystudio_cover_image : classes.input}
                    ProfileComponentClassName ={classes.mystudio_brand_logo}
                    editImageStyle={classes.editImageNew}
                    fetchStudio={`../api/studio/${userData.studio_id}`}
                    onClick={async(cover,profile)=>{
                      if (cover !== "" && cover !== null){
                        var coverSet = cover
                          setCover(coverSet);
                      }
                      if (profile !== "" && profile !== null){
                        var profileSet = profile;
                        setProfile(profileSet) }
                    }}
                    loading={(coverld, profileld)=>{
                      setCoverLoading(coverld);
                      setProfileLoading(profileld);
                    }}
                    open={(str)=>{
                      if (str === false) {
                        setOpen(false)
                        return false
                      }
                      else{ return open } 
                      }}
                  />

                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  className={classes.studioProfile}
                >
                  <FormControl fullWidth className={classes.formMargin}>

                     <Input
                          disableUnderline={true}
                          type="text"
                          placeholder="My name"
                          className={`${classes.textField} ${errors.name ? errors.name : ''}`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          name="name"
                        />      

                    {/* <input
                      id="name"
                      name="name"
                      placeholder="My name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      className={`${classes.customeInputField} ${classes.inputOutline}`}
                    /> */}
                    {errors.name ? (
                      <Typography color="error" variant="body1" gutterBottom>
                        {errors.name}
                      </Typography>
                    ) : (
                      ""
                    )}
                  </FormControl>

                  <FormControl fullWidth className={classes.formMargin}>

                  <Input
                          multiline={true}
                          rows={6}
                          disableUnderline={true}
                          type="text"
                          placeholder="About my studio brand"
                          className={`${classes.textField}`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.about}
                          name="about"
                        /> 
                    
                    {/* <textarea
                      rows={4}
                      name="about"
                      placeholder="About my studio brand"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.about}
                      className={`${classes.customeInputField} ${classes.inputOutline}`}
                    ></textarea> */}

                    {errors.about ? (
                      <Typography color="error" variant="body1" gutterBottom>
                        {errors.about}
                      </Typography>
                    ) : (
                      ""
                    )}
                  </FormControl>
                  <Grid
                    container
                    justify="space-between"
                    style={{ margin: "8px" }}
                  >
                    <Grid item xs={12} md={3} lg={3}>
                      <FormControl fullWidth>

                      <Input
                          disableUnderline={true}
                          type="text"
                          placeholder="City"
                          className={`${classes.textField}`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.city}
                          name="city"
                        />   

                        {/* <input
                          id="city"
                          name="city"
                          placeholder="City"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.city}
                          className={`${classes.customeInputField} ${classes.inputOutline}`}
                        /> */}
                        {errors.city ? (
                          <Typography
                            color="error"
                            variant="body1"
                            gutterBottom
                          >
                            {errors.city}
                          </Typography>
                        ) : (
                          ""
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                      <FormControl fullWidth>

                      <Input
                          disableUnderline={true}
                          type="text"
                          placeholder="State/Province"
                          className={`${classes.textField}`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.state}
                          name="state"
                        /> 

                        {/* <input
                          id="state"
                          name="state"
                          placeholder="State/Province"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.state}
                          className={`${classes.customeInputField} ${classes.inputOutline}`}
                        /> */}
                        {errors.state ? (
                          <Typography
                            color="error"
                            variant="body1"
                            gutterBottom
                          >
                            {errors.state}
                          </Typography>
                        ) : (
                          ""
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                      <FormControl fullWidth>

                      <Input
                          disableUnderline={true}
                          type="text"
                          placeholder="Country"
                          className={`${classes.textField}`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.country}
                          name="country"
                        />   

                        {/* <input
                          id="country"
                          name="country"
                          placeholder="Country"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.country}
                          className={`${classes.customeInputField} ${classes.inputOutline}`}
                        /> */}
                        {errors.country ? (
                          <Typography
                            color="error"
                            variant="body1"
                            gutterBottom
                          >
                            {errors.country}
                          </Typography>
                        ) : (
                          ""
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <div className={classes.socialLinksInputs}>
                  <Grid
                    className={classes.socials}
                    container
                    alignItems="center"
                    justify="space-between"
                  >
                    <Grid item xs={1}>
                      <Box borderRadius={4} className={classes.socialLabel}>
                        <img
                          src={Instagram}
                          alt="instagram"
                          width={50}
                          height={"auto"}
                          style={{ color: "white" }}
                          className={classes.social_icons}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={10}>
                      <TextField
                        id="insta_link"
                        label="My Instagram URL"
                        //placeholder="Instagram Profile URL eg.https://www.instagram.com/instagramProfileURL"
                        name="insta_link"
                        error={errors.insta_link ? true : false}
                        helperText={errors.insta_link ? errors.insta_link : ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values["insta_link"]}
                        className={classes.socialTextField}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    className={classes.socials}
                    container
                    alignItems="center"
                    justify="space-between"
                  >
                    <Grid item xs={1}>
                      <Box borderRadius={4} className={classes.socialLabel}>
                        <img
                          src={Facebook}
                          alt="facebook"
                          width={50}
                          height={"auto"}
                          style={{ color: "white" }}
                          className={classes.social_icons}
                        />
                      </Box>
                    </Grid>
                    <Grid xs={10} item>
                      <TextField
                        id="facebook_link"
                        label="My Facebook URL"
                        name="facebook_link"
                        // placeholder="Facebook Profile URL eg.https://www.facebook.com/faceboookProfileURL"
                        error={errors.facebook_link ? true : false}
                        helperText={
                          errors.facebook_link ? errors.facebook_link : ""
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values["facebook_link"]}
                        className={classes.socialTextField}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    className={classes.socials}
                    container
                    alignItems="center"
                    justify="space-between"
                  >
                    <Grid item xs={1}>
                      <Box borderRadius={4} className={classes.socialLabel}>
                        <img
                          src={Youtube}
                          alt="youtube"
                          width={50}
                          height={"auto"}
                          style={{ color: "white" }}
                          className={classes.social_icons}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={10}>
                      <TextField
                        id="youtube_link"
                        label="My Youtube channel URL"
                        // placeholder="Youtube Channel URL eg.https://www.youtube.com/YoutubeChannelURL"
                        name="youtube_link"
                        error={errors.youtube_link ? true : false}
                        helperText={
                          errors.youtube_link ? errors.youtube_link : ""
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values["youtube_link"]}
                        className={classes.socialTextField}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    className={classes.socials}
                    container
                    alignItems="center"
                    justify="space-between"
                  >
                    <Grid item xs={1}>
                      <Box borderRadius={4} className={classes.socialLabel}>
                        <img
                          src={Website}
                          alt="website"
                          width={50}
                          height={"auto"}
                          style={{ color: "white" }}
                          className={classes.social_icons}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={10}>
                      <TextField
                        id="website_link"
                        label="My Website URL"
                        name="website_link"
                        // placeholder="Website URL eg.https://www.example.com"
                        error={errors.website_link ? true : false}
                        helperText={
                          errors.website_link ? errors.website_link : ""
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values["website_link"]}
                        className={classes.socialTextField}
                      />
                    </Grid>



                  </Grid>

                  <Grid
                    className={classes.socials}
                    container
                    alignItems="center"
                    justify="space-between"
                  >
                    <Grid item xs={1}>
                      <Box borderRadius={4} className={classes.socialLabel}>
                        <img
                          src={Twitter}
                          alt="twitter"
                          width={50}
                          height={"auto"}
                          style={{ color: "white" }}
                          className={classes.social_icons}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={10}>
                      <TextField
                        id="twitter_link"
                        label="My Twitter URL"
                        name="twitter_link"
                        // placeholder="Website URL eg.https://www.example.com"
                        error={errors.twitter_link ? true : false}
                        helperText={
                          errors.twitter_link ? errors.twitter_link : ""
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values["twitter_link"]}
                        className={classes.socialTextField}
                      />
                    </Grid>

                        

                  </Grid>


                </div>
              </Grid>

              <Grid
                item
                xs={12}
                md={5}
                className={`${classes.item2}  ${classes.templateAndColorSelection}`}
              >
                <div className={classes.templates}>
                  <div className={classes.template_type}>
                    <div>
                      {" "}
                      <h3> Template type </h3>{" "}
                    </div>
                    <div>
                      {" "}
                      <p
                        style={{ cursor: "pointer" }}
                        onClick={() => openPreviewPage(values.templateType)}
                      >
                        Preview
                      </p>
                    </div>
                  </div>
                  <div className={classes.advanced}>
                    <div>
                      <p style={{ textTransform: "capitalize" }}>
                        {values.templateType}
                      </p>{" "}
                    </div>
                    <div>
                      {displayThemeSlider ? (
                        <ExpandLessIcon
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            setDisplayThemeSlider((preState) => !preState)
                          }
                        />
                      ) : (
                        <ExpandMoreOutlinedIcon
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            setDisplayThemeSlider((preState) => !preState)
                          }
                        />
                      )}
                    </div>
                  </div>
                  {displayThemeSlider && (
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="templateType"
                        name="templateType"
                        value={values.templateType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <FormControlLabel
                          value="standard"
                          control={<Radio color="primary" />}
                          label={
                            <>
                              <b> Standard </b>
                              <br></br>
                              <img
                                src={StandardTheme}
                                className={classes.themeImage}
                              />
                            </>
                          }
                        />
                        <FormControlLabel
                          value="popular"
                          control={<Radio color="primary" />}
                          label={
                            <>
                              <b> Popular </b>
                              <br></br>
                              <img
                                src={PopularTheme}
                                className={classes.themeImage}
                              />
                            </>
                          }
                        />
                        <FormControlLabel
                          value="advanced"
                          control={<Radio color="primary" />}
                          label={
                            <>
                              <b> Advance </b>
                              <br></br>
                              <img
                                src={AdvanceTheme}
                                className={classes.themeImage}
                              />
                            </>
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                </div>
                <div className={classes.customizeTheme}>
                  <h3 className={classes.customizeThemeHeading}>
                    {" "}
                    Customize site{" "}
                  </h3>
                  <div>
                    <span>Primary color</span>
                    <span>
                      <input
                        className={classes.primaryColorInput}
                        name="primaryColor"
                        type="color"
                        value={values.primaryColor}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="primaryColor"
                      />
                    </span>
                    <div
                      className={classes.primaryColorSection}
                      style={{ border: `1px solid ${values.primaryColor}` }}
                    >
                      <div className={classes.colorCode}>
                        {values.primaryColor}{" "}
                      </div>
                      <div className={classes.selectColor}>
                        <label
                          htmlFor="primaryColor"
                          className={classes.primaryColorLabel}
                          style={{ backgroundColor: values.primaryColor }}
                        >
                          <span style={{ visibility: "hidden" }}> Color </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span>Secondary color</span>
                    <span>
                      <input
                        name="secondaryColor"
                        type="color"
                        value={values.secondaryColor}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="secondaryColor"
                        className={classes.secondaryColorInput}
                      />
                    </span>

                    <div
                      className={classes.secondaryColorSection}
                      style={{ border: `1px solid ${values.secondaryColor}` }}
                    >
                      <div className={classes.colorCode}>
                        {values.secondaryColor}{" "}
                      </div>
                      <div className={classes.selectColor}>
                        <label
                          htmlFor="secondaryColor"
                          className={classes.secondaryColorLabel}
                          style={{ backgroundColor: values.secondaryColor }}
                        >
                          <span style={{ visibility: "hidden" }}> Color </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
            <Button
              type="submit"
              form="my-site-form-1"
              className={classes.submitButton}
            >
              {`${studio.status === "active" ? "PUBLISH" : "SAVE"}`}
            </Button>
            {studio.status !== "active" ? (
              <FormHelperText style={{ textAlign: "center" }}>
                Your changes will be saved, however won't be publish to a main
                site.
              </FormHelperText>
            ) : (
              ""
            )}
          </form>
        )}
      </Formik>
    </>
  );
}