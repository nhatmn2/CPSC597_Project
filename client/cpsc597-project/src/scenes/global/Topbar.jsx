import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";


const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
            {/* SEARCH BAR */}
            <Box display="flex" alignItems="center" backgroundColor={colors.primary[400]} borderRadius="3px">
                <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: '10px' }}>
                    <SearchIcon />
                </IconButton>
            </Box>
            {/* ICONS TOP RIGHT */}
            <Box display="flex" gap={1}>
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (<DarkModeOutlinedIcon />) : (<LightModeOutlinedIcon />)}
                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <PersonOutlinedIcon />
                </IconButton>
            </Box>
        </Box>);
}

export default Topbar;
