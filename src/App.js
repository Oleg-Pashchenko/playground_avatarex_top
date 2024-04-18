import ChatUI from './Chat'
import './App.css';
import {Box} from "@mui/material";

function App() {
    return (
        <div className="App">
            <Box className="container" sx={{
                paddingX: {
                    xs: 0,
                    sm: 0,
                    md: 10
                }


            }}>

                <ChatUI/>
            </Box>
        </div>
    );
}

export default App;
