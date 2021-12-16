import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from '@mui/material/CircularProgress';

export default function PageContainer({children, title, loading = false}){
    return (
        <Container maxWidth="lg">
            <Paper className="px-1">
                <Typography variant="h5" component="div" className="text-center">
                    {loading ? <CircularProgress /> : <div className="pt-2">{title}</div>}
                </Typography>
                {!loading && children}
            </Paper>
        </Container>
    );
}