import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Grid,
  Typography,
  Card,
  Button,
  Hidden,
  Box,
  withStyles,
  withWidth,
  isWidthUp,
} from "@material-ui/core";

const styles = (theme) => ({
  card: {
    boxShadow: theme.shadows[4],
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(1.5),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(1.5),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down("lg")]: {
      width: "auto",
    },
  },
  wrapper: {
    position: "relative",
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: theme.spacing(2),
  },
  image: {
    maxWidth: "100%",
    verticalAlign: "middle",
    borderRadius: theme.shape.borderRadius,
  },
  container: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(6),
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(9),
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(6),
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3),
    },
  },
  containerFix: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "none !important",
    },
  },
});

function HeadSection(props) {
  const { classes, theme, width } = props;
  return (
    <Fragment>
      <div className={classNames(classes.wrapper)}>
        <div className={classNames("container-fluid", classes.container)}>
          <Box display="flex" justifyContent="center" className="row">
            <Card
              className={classes.card}
            >
              <div className={classNames(classes.containerFix, "container")}>
                <Box justifyContent="space-between" className="row">
                  <Grid item xs={12} md={5}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                      height="100%"
                    >
                      <div>
                        <Box mb={2}>
                          <Typography
                            variant={isWidthUp("lg", width) ? "h6" : "body1"}
                            color="textSecondary"
                          >
                            <SettingsIcon /> {props.description1}
                          </Typography>
                        </Box>
                        <Box mb={2}>
                          <Typography
                            variant={isWidthUp("lg", width) ? "h6" : "body1"}
                            color="textSecondary"
                          >
                            <GavelIcon /> {props.description2}
                          </Typography>
                        </Box>
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          className={classes.extraLargeButton}
                          classes={{ label: classes.extraLargeButtonLabel }}
                          onClick={props.openLoginDialog}
                        >
                          {props.buttonLabel}
                        </Button>
                      </div>
                    </Box>
                  </Grid>
                  <Hidden smDown>
                    <Grid item md={6}>
                      <ZoomImage
                        src={props.imgage} 
                        alt={props.alt}
                        className={classes.image}
                      />
                    </Grid>
                  </Hidden>
                </Box>
              </div>
            </Card>
          </Box>
        </div>
      </div>
      <WaveBorder
        upperColor={theme.palette.secondary.main}
        lowerColor="#FFFFFF"
        className={classes.waveBorder}
        animationNegativeDelay={2}
      />
    </Fragment>
  );
}

HeadSection.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.string,
  theme: PropTypes.object,
};

export default withWidth()(
  withStyles(styles, { withTheme: true })(HeadSection)
);
