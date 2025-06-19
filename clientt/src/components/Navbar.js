import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import logo from "../assets/PFP-01__5_-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";

const Navbar = ({ loggedIn, handleLogout }) => {
  const [anchorElProducts, setAnchorElProducts] = React.useState(null);
  const [anchorElHelp, setAnchorElHelp] = React.useState(null);
  const [anchorElServices, setAnchorElServices] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate();
  const { cart } = useCart();
  const role = localStorage.getItem("role");

  const handleOpenProductsMenu = (e) => setAnchorElProducts(e.currentTarget);
  const handleCloseProductsMenu = () => setAnchorElProducts(null);

  const handleOpenHelpMenu = (e) => setAnchorElHelp(e.currentTarget);
  const handleCloseHelpMenu = () => setAnchorElHelp(null);

  const handleOpenServicesMenu = (e) => setAnchorElServices(e.currentTarget);
  const handleCloseServicesMenu = () => setAnchorElServices(null);

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    handleLogout();
    navigate("/");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (searchTerm.trim()) {
        navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      }
    }
  };

  const drawer = (
    <Box sx={{ width: 280 }} role="presentation">
      {/* Header with logo + close */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
        <Link to="/">
          <img src={logo} alt="Top Mobile" style={{ height: 50 }} />
        </Link>
        <IconButton onClick={() => setMobileOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <List>
        {/* Home */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/" onClick={() => setMobileOpen(false)}>
            <ListItemIcon>
              <HomeIcon sx={{ color: "#ff8000" }} />
            </ListItemIcon>
            <ListItemText primary="Ballina" primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItemButton>
        </ListItem>

        {/* Products Accordion */}
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#ff8000" }} />} sx={{ px: 2 }}>
            <Typography sx={{ fontWeight: 600, color: "#ff8000" }}>Produktet</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            {["iphone", "samsung", "giftcard", "accessories"].map((cat) => (
              <ListItemButton
                key={cat}
                component={Link}
                to={`/products/${cat}`}
                sx={{ pl: 4 }}
                onClick={() => setMobileOpen(false)}
              >
                <ListItemText primary={cat.charAt(0).toUpperCase() + cat.slice(1)} />
              </ListItemButton>
            ))}
          </AccordionDetails>
        </Accordion>

        {/* Services Accordion */}
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#ff8000" }} />} sx={{ px: 2 }}>
            <Typography sx={{ fontWeight: 600, color: "#ff8000" }}>Shërbimet</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            {[
              { path: "mirembajtja", label: "Mirëmbajtja me Kontratë" },
              { path: "telefona", label: "Pjesë për Telefona" },
              { path: "playstation", label: "Pjesë për PlayStation" },
              { path: "servisi", label: "Servisi & Përkrahja" },
              { path: "asistenca", label: "Asistencë Mobile" },
            ].map((srv) => (
              <ListItemButton
                key={srv.path}
                component={Link}
                to={`/sherbimet/${srv.path}`}
                sx={{ pl: 4 }}
                onClick={() => setMobileOpen(false)}
              >
                <ListItemText primary={srv.label} />
              </ListItemButton>
            ))}
          </AccordionDetails>
        </Accordion>

        <Divider sx={{ my: 1 }} />

        {/* Terms & Help */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/terms" onClick={() => setMobileOpen(false)}>
            <ListItemText primary="Kushtet & Kujdesi ndaj Klientit" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ background: "#fff", color: "#ff8000", boxShadow: 2 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between", minHeight: 82 }}>
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", mr: 1 }}>
            <IconButton
              size="large"
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{ color: "#ff8000" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Drawer
            anchor="left"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
          >
            {drawer}
          </Drawer>

          <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
            <Link to="/">
              <img src={logo} alt="Top Mobile Logo" style={{ height: 70, objectFit: "contain" }} />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1.5 }}>
            <Button component={Link} to="/" sx={{ color: "#ff8000", fontWeight: 600 }}>
              Ballina
            </Button>

            <Button
              sx={{ color: "#ff8000", fontWeight: 600 }}
              onClick={handleOpenProductsMenu}
              endIcon={<ArrowDropDownIcon />}
            >
              Produktet
            </Button>
            <Menu
              anchorEl={anchorElProducts}
              open={Boolean(anchorElProducts)}
              onClose={handleCloseProductsMenu}
            >
              <MenuItem component={Link} to="/products/iphone" onClick={handleCloseProductsMenu}>
                iPhone
              </MenuItem>
              <MenuItem component={Link} to="/products/samsung" onClick={handleCloseProductsMenu}>
                Samsung
              </MenuItem>
              <MenuItem component={Link} to="/products/giftcard" onClick={handleCloseProductsMenu}>
                Gift Card
              </MenuItem>
              <MenuItem component={Link} to="/products/accessories" onClick={handleCloseProductsMenu}>
                Aksesorë
              </MenuItem>
            </Menu>

            <Button
              sx={{ color: "#ff8000", fontWeight: 600 }}
              endIcon={<ArrowDropDownIcon />}
              onClick={handleOpenServicesMenu}
            >
              Shërbimet
            </Button>
            <Menu
              anchorEl={anchorElServices}
              open={Boolean(anchorElServices)}
              onClose={handleCloseServicesMenu}
            >
              <MenuItem component={Link} to="/sherbimet/mirembajtja" onClick={handleCloseServicesMenu}>
                Mirëmbajtja me Kontratë
              </MenuItem>
              <MenuItem component={Link} to="/sherbimet/telefona" onClick={handleCloseServicesMenu}>
                Pjesë për Telefona
              </MenuItem>
              <MenuItem component={Link} to="/sherbimet/playstation" onClick={handleCloseServicesMenu}>
                Pjesë për PlayStation
              </MenuItem>
              <MenuItem component={Link} to="/sherbimet/servisi" onClick={handleCloseServicesMenu}>
                Servisi & Përkrahja
              </MenuItem>
              <MenuItem component={Link} to="/sherbimet/asistenca" onClick={handleCloseServicesMenu}>
                Asistencë Mobile
              </MenuItem>
            </Menu>

            <Button component={Link} to="/blog" sx={{ color: "#ff8000", fontWeight: 600 }}>
              Blog
            </Button>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              maxWidth: 370,
              mx: { xs: 0, md: 2 },
              display: { xs: "none", sm: "flex" },
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Çfarë po kërkoni?"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              sx={{
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: 1,
                minWidth: 120,
                "& .MuiOutlinedInput-root": {
                  paddingRight: 0,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon sx={{ color: "#aaa", cursor: "pointer" }} onClick={handleSearch} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.3 }}>
            <Button sx={{ minWidth: 0, p: 0, color: "#ff8000" }} onClick={handleOpenHelpMenu}>
              <span style={{ fontSize: 22 }}>❓</span>
            </Button>
            <Menu
              anchorEl={anchorElHelp}
              open={Boolean(anchorElHelp)}
              onClose={handleCloseHelpMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem component={Link} to="/terms" onClick={handleCloseHelpMenu}>
                Kushtet & Kujdesi ndaj Klientit
              </MenuItem>
            </Menu>

            <Link to="/cart">
              <IconButton sx={{ color: "#ff8000", position: "relative" }}>
                <ShoppingCartIcon />
                {cart?.length > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      background: "red",
                      color: "white",
                      borderRadius: "50%",
                      fontSize: 10,
                      padding: "2px 5px",
                    }}
                  >
                    {cart.length}
                  </span>
                )}
              </IconButton>
            </Link>

            {loggedIn && role === "admin" && (
              <Button onClick={onLogout} sx={{ color: "#ff8000", fontWeight: 600 }}>
                Dil
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
