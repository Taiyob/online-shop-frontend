import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

const options = [
  {
    label: "English",
    code: "us",
    flag: "https://flagcdn.com/w40/us.png",
  },
  {
    label: "Bangla",
    code: "bd",
    flag: "https://flagcdn.com/w40/bd.png",
  },
  {
    label: "German",
    code: "de",
    flag: "https://flagcdn.com/w40/de.png",
  },
  {
    label: "Arabic",
    code: "sa",
    flag: "https://flagcdn.com/w40/sa.png",
  },
];

export default function DropdownLanguage() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex].label}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
        sx={{ backgroundColor: "#e91e63" }}
      >
        {/* <Button onClick={handleClick}>
          <img
            src={options[selectedIndex].flag}
            alt={options[selectedIndex].code}
            style={{ width: 20, height: 15, marginRight: 8 }}
          />
          {options[selectedIndex].label}
        </Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select language"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button> */}

        <Button
          onClick={handleClick}
          sx={{
            backgroundColor: "#E91E63",
            "&:hover": { backgroundColor: "#d81b60" },
            
          }}
        >
          <img
            src={options[selectedIndex].flag}
            alt={options[selectedIndex].code}
            style={{ width: 20, height: 15, marginRight: 8 }}
          />
          {options[selectedIndex].label}
        </Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select language"
          aria-haspopup="menu"
          onClick={handleToggle}
          sx={{
            backgroundColor: "#E91E63",
            "&:hover": { backgroundColor: "#d81b60" },
          }}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option.label}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      <img
                        src={option.flag}
                        alt={option.code}
                        style={{ width: 20, height: 15, marginRight: 8 }}
                      />
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
