import { createStyles,Theme } from "@material-ui/core/styles";
export const styles =(theme: Theme) => createStyles({
      formPaper: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
      },
      margin: {},
      editImageIcon: {
        height: 20,
        width: 20,
        marginTop: 7,
        flexDirection: "row",
        alignItems: "flex-end",
        display: "center",
        marginLeft: 150
      },
      dragImage: {
        opacity: 0.8,
        flexDirection: "row",
        flex: "1",
      },
      profileImgPaper: {
        height: 150,
        width: 150,
        backgroundColor:
          theme.palette.type === "light"
            ? theme.palette.grey[50]
            : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        alignSelf: "flex-end",
        alignContent: "flex-end",
        marginBottom: "auto",
      },
      editImage: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "flex-start",
      },
      separateProfileFlex: {
        display: "flex", 
        flexDirection: "row-reverse", 
        justifyContent:"space-between",
      },
      editCropper:{
        display: "flex"
      },
      editDrag: {
        display: "flex",
        fontSize: "large",
        marginTop: "120px",
        marginLeft: "70px",
      },  
      editDrag2: {
        fontSize: "large",
        marginTop: "190px",
        marginLeft: "50px",
      },      
      coverImgPaper: {
        height: 350,
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        backgroundColor:
          theme.palette.type === "light"
            ? theme.palette.grey[50]
            : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      },
      ModalStyle: {
        width:"600px",
      },
      coverIconPosition: {
        dislay: "flex",
      },

      modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
      },

      profilePosition: {
        // position: "absolute",
        top: "100%",
        left: 0,
        alignItems: "flex-end",
      },

      coverImgButton: {
        marginBottom: theme.spacing(2),
        backgroundColor: "#ffffff",
      },
      dividerStyle: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(6),
      },
      linkHeader: {
        marginBottom: theme.spacing(6),
      },
      preview: {
        marginTop: 7,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      },

      urlTextField: {
        width: "100%",
        textTransform:"lowercase"
      },
      urlTextFieldValidate: {
        textTransform:"lowercase"
      },
      socialTextField: {
        width: "100%",
      },
      input: {
        display: "none",
      },
      socialLabel: {
        fontSize: 15,
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 5,
        paddingLeft: 5,
        maxWidth: 350,
        width: 140,
        [theme.breakpoints.up("md")]: {
          width: 270,
          fontSize: 18,
        },
      },
      domainDecl: {

        [theme.breakpoints.down("md")]: {
          marginBottom: theme.spacing(1),

        },
      },
      domainLabel: {
        backgroundColor: "#e8e8e8",
        fontSize: 18,

        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 5,
        paddingLeft: 5,
        maxWidth: 350,
      },

      locField: {
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(3),
      },
      instructorTextField: {
        marginRight: theme.spacing(1),
      },
      coverImageListDiv: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        width: "100%",
      },
      dialogRoot: {
        margin: 0,
        padding: theme.spacing(2),
      },
      closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
      },
      collectionImages: {
        width: "100%",
        display: "block",
        objectFit: "contain",
        objectPosition: "center",
        height: 150
      },
      socialIcons: {
        marginRight: 10,
      },
   photosImg: {
      /* Just in case there are inline attributes */
      width: "100%" ,
      height: "auto" ,
      marginTop: 5,
      cursor: "pointer",
    },
    zoomDisconnectBtn: {
      background: "red",
      color: "white",
      borderRadius: 50
      },
      cropContainer: {
        position: "relative",
        width: "100%",
        height: 350,
        background: '#FFFFFF',
        [theme.breakpoints.up('sm')]: {
          height: 400,
        },
      },
      openCropperDiv: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      cropButton: {
        flexShrink: 0,
        marginLeft: 16,
      },
      controls: {
        position: "absolute",
        bottom: -30,
        left: "50%",
        width: "50%",
        transform: "translateX(-50%)",
        height: "80px",
        display: "flex",
        alignItems: "center",
      },
      sliderContainer: {
        display: 'flex',
        flex: '1',
        alignItems: 'center',
      },
      sliderLabel: {
        [theme.breakpoints.down('xs')]: {
          minWidth: 65,
        },
        color: "primary",
      },
      slider: {
        marginLeft: 2,
        backgroundColor: "white",
        [theme.breakpoints.up('sm')]: {
          flexDirection: 'row',
          alignItems: 'center',
          margin: '0 16px',
          backgroundColor: "white",
        },
      },
      ///////////////////
      root: {
        fontFamily: "Roboto",
      },
      socials: {
        marginBottom: theme.spacing(0),
        [theme.breakpoints.down(450)]: {
          alignItems: "end",
        },
      },
      mainMySite: {
        paddingTop:10
      },

      photos: {
        /* Prevent vertical gaps */
        lineHeight: 0,
        columnCount: 5,
        [theme.breakpoints.down("lg")]: {
          columnCount: 4,
        },
        [theme.breakpoints.down("md")]: {
          columnCount: 3,
        },
        [theme.breakpoints.down("sm")]: {
          columnCount: 2,
        },
        columnGap: 5,
        rowGap: 5,
      },

      myStudioBasicText: {
        fontSize: "18px",
        fontFamily: "Roboto",
        marginBottom: 32,
        [theme.breakpoints.down(500)]: {
          fontSize: "15px",
        },
      },

      inputOutline:{
          '&:focus': {
          outline: "none",
        },
      },
    
      studioProfile: {
        marginTop: 20,
      },
      formMargin: {
        margin: theme.spacing(1),
        fontFamily: "Roboto",
      },

      mystudio_header_main: {
        border: "2px solid #00549f",
        borderRadius: "23px",
        fontFamily: "Roboto",
        marginBottom: "15px",
      },
      mystudio_header_title: {
        fontFamily: "Roboto",
        padding: "15px",
        backgroundColor: "#00549f",
        fontSize: "12px",
        borderTopLeftRadius: "20px",
        borderBottomLeftRadius: "20px",
        color: "white",
        textAlign: "center",
        [theme.breakpoints.down(1150)]: {
          fontSize: "12px",
          padding: 16,
        },
        [theme.breakpoints.down(390)]: {
          fontSize: "11px",
          padding: "23px 0px",
        },
      },
      mystudio_header_url: {
        fontFamily: "Roboto",
        padding: "15px 0px",
        backgroundColor: "#00549f",
        fontSize: "12px",
        borderTopRightRadius: "20px",
        borderBottomRightRadius: "20px",
        color: "white",
        textAlign: "center",
        [theme.breakpoints.down(1150)]: {
          fontSize: "12px",
          padding: "16px 0px",
        },
        [theme.breakpoints.down(1070)]: {
          fontSize: "13px",
          padding: "24px 0px",
        },
        [theme.breakpoints.down(960)]: {
          fontSize: "12px",
          padding: "16px 0px",
        },
        [theme.breakpoints.down(476)]: {
          fontSize: "13px",
          padding: "24px 0px",
        },
        [theme.breakpoints.down(390)]: {
          fontSize: "12px",
          padding: "22px 0px",
        },
        [theme.breakpoints.down(322)]: {
          fontSize: "13px",
          padding: "29px 0px",
        },
      },
      mystudio_header_input: {
        padding: 14,
        width: "100%",
        borderTopRightRadius: "20px",
        borderBottomRightRadius: "20px",
        fontFamily: "Roboto",
      },
      mystudio_brand_logo: {
        height: "170px",
        width: "200px",
        boxShadow: "0 0 52.2px 7.8px rgba(0, 0, 0, 0.13)",
        borderRadius: "25px",
        display: "flex",
        // flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        // textAlign: "center",
        // backgroundImage: `url(${profile !== "" ? profile : ""})`,
        // backgroundRepeat: "no-repeat",
        backgroundColor: "white",
        backgroundSize: "cover",
        backgroundPosition: "center",
        [theme.breakpoints.down(960)]: {
          margin: theme.spacing(1),
        },
      },
      mystudio_cover_image: {
        position: "relative",
        height: "170px",
        width: "330px",
        boxShadow: "0 0 52.2px 7.8px rgba(0, 0, 0, 0.13)",
        borderRadius: "25px",
        display: "flex",
        // flexDirect3ion: "row",
        justifyContent: "flex-end",
        // alignItems: "center",
        textAlign: "center",
        // backgroundImage: `url(${cover !== "" ? cover : ""})`,
        // backgroundRepeat: "no-repeat",
        backgroundColor: "white",
        backgroundSize: "cover",
        backgroundPosition: "center",
        [theme.breakpoints.down(960)]: {
          margin: theme.spacing(1),
        },
      },
      editImageNew: {
        position: "absolute",
        top: 20,
        right: 20,
        color: "black",
        border: "1px solid black",
        borderRadius: "50%",
        padding: 5,
        cursor: "pointer",
        backgroundColor: "white",
    },

    // @media (maxWidth: "800px"): {

    // },
    
      templateAndColorSelection: {
        position: "relative",
      },
      customeInputField: {
        fontFamily: "Roboto",
        padding: "15px",
        borderRadius: "16.5px",
        backgroundColor: "#eeeeee",
        border: "none",
        [theme.breakpoints.down(960)]: {
          margin: "8px 0px",
        },
      },
      social_icons: {
        filter: "opacity(0.5)",
        [theme.breakpoints.down(450)]: {
          width: "30px",
        },
      },
      socialLinksInputs: {
        marginTop: "40px",
      },
      templates: {
        padding: "10px 20px",
        backgroundColor: "white",
        borderRadius: "25px",
        boxShadow: "0 0 52.2px 7.8px rgba(0, 0, 0, 0.13)",
        fontSize: 18,
        [theme.breakpoints.down(1500)]: {
          fontSize: 15,
        },
      },
      template_type: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "Roboto",
        marginTop: 9,
        "& p": {
          color: "#2b60f8",
        },
      },
      advanced: {
        fontFamily: "Roboto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
      customizeTheme: {
        padding: "10px 20px",
        fontFamily: "Roboto",
        backgroundColor: "white",
        borderRadius: "25px",
        boxShadow: "0 0 52.2px 7.8px rgba(0, 0, 0, 0.13)",
        marginTop: 20,
        fontSize: 18,
        [theme.breakpoints.down(1500)]: {
          fontSize: 15,
        },
      },
      customizeThemeHeading: {
        marginBottom: 40,
        marginTop: 22,
        fontFamily: "Roboto",
      },
      themeImage: {
        width: "100%",
        height: "122px",
        margin: "10px 0px",
        [theme.breakpoints.down(960)]: {
          width: "300px",
        },
        [theme.breakpoints.down(400)]: {
          width: "225px",
          height: "110px",
        },
      },
      primaryColorSection: {
        fontFamily: "Roboto",
        display: "flex",
        alignItems: "center",
        borderRadius: "17px",
        marginBottom: 30,
        justifyContent: "space-between",
      },
      primaryColorInput: {
        visibility: "collapse",
      },
      primaryColorLabel: {
        fontFamily: "Roboto",
        borderRadius: 17,
        padding: "11px",
        float: "left",
        width: "100%",
      },
      colorCode: {
        flex: "0 1 50%",
        padding: "10px",
      },
      selectColor: {
        flex: "0 1 50%",
      },
      secondaryColorSection: {
        fontFamily: "Roboto",
        display: "flex",
        alignItems: "center",
        borderRadius: "17px",
        marginBottom: 40,
        justifyContent: "space-between",
      },
      secondaryColorInput: {
        visibility: "collapse",
      },
      secondaryColorLabel: {
        fontFamily: "Roboto",
        borderRadius: 17,
        padding: "11px",
        float: "left",
        width: "100%",
      },
      submit: {},
      previewButton: {
        border: "1px solid #00549f",
        color: "white",
        borderRadius: "18.5px",
        fontSize: 14,
        padding: "10px 19px",
        backgroundColor: "#00549f",
        margin: "auto",
        [theme.breakpoints.down(345)]: {
          fontSize: 10,
        },
      },
      submitButton: {
        fontFamily: "Roboto",
        width: "100%",
        backgroundColor: "#00549f",
        color: "white",
        margin: 10,
        borderRadius: "18.5px",
        fontSize: 17,
        border: "none",
        padding: "10px",
      },

      item1:{
        [theme.breakpoints.down('sm')]: {
          order: 2,
        },
      },
      item2:{
        [theme.breakpoints.down('sm')]: {
          order: 1,
        },
      },
 
      textField : {
        borderRadius: "16.5px",
        backgroundColor: "#eeeeee",
        border: "none",
        width: "100%",
        padding:"8px 12px",
        outline: "none",
        [theme.breakpoints.down(960)]: {
          margin: "8px 0px",
        },
    },

    });