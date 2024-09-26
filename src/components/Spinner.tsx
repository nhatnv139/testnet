import { Backdrop, CircularProgress } from "@mui/material"

export const SpinnerCustom = ({ open = false }: any) => {
    return (<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>)
}