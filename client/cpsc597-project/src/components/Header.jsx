import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode);
    return <Box mb="30px">
        <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ mb: "5px"}}>  {title} </Typography> {/* title of the page */}
        <Typography variant="h5" color={colors.greenAccent[400]}>{subtitle}</Typography> {/* this is the 2nd line of the title */}
    </Box>
}

export default Header;
