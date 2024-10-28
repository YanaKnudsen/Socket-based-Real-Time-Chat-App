import {createTheme, responsiveFontSizes} from "@mui/material";

export let theme =  createTheme({
    typography: {
        fontFamily: [
            'Roboto',
        ].join(','),
        h6: {
            fontWeight: 600 ,// or 'bold'
        },
        h4: {
            fontWeight: 600 ,// or 'bold'
        },
        subtitle1: {
            fontWeight: 600, // or 'bold'

        }

    },});
theme=responsiveFontSizes(theme);

export let desriptiontheme =  createTheme({
    typography: {
        fontFamily: [
            'Roboto',
        ].join(','),
        h6:{
            fontWeight: 300,
        }
    },});
desriptiontheme=responsiveFontSizes(desriptiontheme);

export let featuretheme =  createTheme({
    typography: {
        fontFamily: [
            'Roboto Condensed',
        ].join(','),
        h6: {
            fontWeight: 600 ,// or 'bold'
            color:"#A9A9A9",
        },
    },});
featuretheme=responsiveFontSizes(featuretheme);