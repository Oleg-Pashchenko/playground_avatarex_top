import * as React from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    Paper,
    MenuItem,
    Divider,
    Avatar,
    Popover,
} from "@mui/material";
import {useEffect, useState} from 'react'
import SendIcon from "@mui/icons-material/Send";
import {ChatApi} from "./requests";

const ChatUI = () => {
    const [input, setInput] = React.useState("");
    const [context, setContext] = useState('');
    const [model, setModel] = useState('');
    const [provider, setProvider] = useState('');
    const [token, setToken] = useState('');
    const [messages, setMessages] = useState([]);


    const handleSend = async () => {
        if (input.trim() !== "") {

            const contextuser = {
                'role': 'user',
                'content': input,
            }

            const newMessages = [...messages, contextuser];
            setMessages(newMessagesRes);

            console.log(messages);
            try {
                const res = await ChatApi(newMessages, model, 1, 1, token, false)
                console.log(res)
                const contextassistant = {
                    'role': 'assistant',
                    'content': res.data.answer,
                }
                const newMessagesRes = [...newMessages, contextassistant];
                setMessages(newMessagesRes);
                console.log(messages);
            } catch (e) {
                console.log(e)
            }
            setInput("");
        }
    };


    useEffect(() => {
        console.log(messages)
    }, [messages]);

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };
    const handleContextChange = (event) => {
        setContext(event.target.value);
        const contextsystem = {
            'role': 'system',
            'content': event.target.value,
        }
        const newMessages = [...messages];
        newMessages[0] = contextsystem;
        setMessages(newMessages);
    };
    const handleModelChange = (event) => {
        setModel(event.target.value);
    };
    const handleProviderChange = (event) => {
        setProvider(event.target.value);
    };
    const handleTokenChange = (event) => {
        setToken(event.target.value);
    };

    const [openPopoverStartChat, setOpenPopoverStartChat] = useState(null)

    const closePopoverAddChat = () => {
        setOpenPopoverStartChat(null)
    }
    const clearAllMessages = () => {
        setMessages([messages[0]]);
    }
    const open = Boolean(openPopoverStartChat)
    const addWorkerPopoverId = open ? 'popover-addWorker' : undefined
    const openPopoverAddChat = (event) => {
        setOpenPopoverStartChat(event.currentTarget)
    }


    return (
        <Box sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
            borderRadius: '15px'
        }}>
            <Grid
                sx={{p: 1, justifyContent: 'center',}}
                container spacing={2}
            >
                <Grid
                    item sm={2} xs={6}
                >
                    <TextField
                        fullWidth
                        label="Токен"
                        onChange={handleTokenChange}
                        value={token}
                        InputProps={{
                            sx: {
                                borderRadius: '15px'
                            }
                        }}
                    >
                    </TextField>
                </Grid>
                <Grid
                    item sm={2} xs={6}
                >
                    <TextField
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        select
                        disabled
                        fullWidth
                        label="Провайдер"
                        InputProps={{
                            sx: {
                                borderRadius: '15px'
                            }
                        }}
                        onChange={handleProviderChange}
                        value={provider}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>Twenty</MenuItem>
                        <MenuItem value={2}>Twenty one</MenuItem>
                        <MenuItem value={2}>Twenty one and a half</MenuItem>
                    </TextField>
                </Grid>
                <Grid
                    item sm={2} xs={6}
                >
                    <TextField
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        select
                        fullWidth
                        label="Модель"
                        onChange={handleModelChange}
                        value={model}
                        InputProps={{
                            sx: {
                                borderRadius: '15px'
                            }
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value='gpt-4-0125-preview'>gpt-4-0125-preview</MenuItem>
                    </TextField>
                </Grid>
                <Grid item sm={2} xs={6} sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Button sx={{
                        width: '100%',
                        color: 'white',
                        backgroundColor: 'rgba(0, 108, 239, 1)',
                        borderRadius: '8px',
                        '&:hover': { // Эффект hover
                            backgroundColor: 'rgb(3,100,218)', // Изменение цвета фона при наведении
                        }
                    }}
                            aria-describedby={addWorkerPopoverId}

                            onClick={openPopoverAddChat}
                            variant="text" color="inherit">
                        Изменить Контекст
                    </Button>
                    <Popover
                        id={addWorkerPopoverId}
                        open={open}
                        anchorEl={openPopoverStartChat}
                        onClose={closePopoverAddChat}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        PaperProps={{
                            style: {marginTop: '10px'},
                        }}
                        sx={{

                            borderRadius: '999px'
                        }}
                    >
                        <TextField
                            id="standard-multiline-static"
                            label=""
                            multiline
                            rows={4}
                            placeholder="Ваш контекст"
                            variant="standard"
                            value={context}
                            onChange={handleContextChange}
                            sx={{
                                width: '30vw',
                                borderRadius: '9999px',
                                marginX: 2
                            }}
                        />

                    </Popover>
                </Grid>
                <Grid item sm={2} xs={6} sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Button sx={{
                        width: '100%',
                        color: 'white',
                        backgroundColor: 'rgba(0, 108, 239, 1)',
                        borderRadius: '8px',
                        '&:hover': { // Эффект hover
                            backgroundColor: 'rgb(3,100,218)', // Изменение цвета фона при наведении
                        }
                    }}
                            aria-describedby={addWorkerPopoverId}

                            onClick={clearAllMessages}
                            variant="text" color="inherit">
                        Перезапустить
                    </Button>
                </Grid>


            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Box sx={{
                flexGrow: 1, overflow: "auto", p: 2, borderRadius: '15px', "&::-webkit-scrollbar": {
                    width: '8px',
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: '#a8a8a8',
                    borderRadius: '5px',
                }
            }}>
                {messages.slice(1).map((message, index) => (
                    <Message key={index} message={message}/>
                ))}
            </Box>
            <Box sx={{p: 2, pt: 0, backgroundColor: "background.default", borderRadius: '15px'}}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Box sx={{
                        display: 'flex',
                        width: '100%',

                    }}>
                        <TextField
                            fullWidth
                            placeholder="Type a message"
                            value={input}
                            onChange={handleInputChange}
                            InputProps={{
                                sx: {
                                    borderTopLeftRadius: '15px',
                                    borderBottomLeftRadius: '15px',
                                    borderTopRightRadius: '0px',
                                    borderBottomRightRadius: '0px',
                                }
                            }}
                        />
                        <Button
                            fullWidth
                            color="primary"
                            variant="contained"
                            endIcon={<SendIcon/>}
                            onClick={handleSend}
                            sx={{
                                flex: '0 0 10%',
                                borderTopRightRadius: '15px',
                                borderBottomRightRadius: '15px',
                                borderTopLeftRadius: '0px',
                                borderBottomLeftRadius: '0px'
                            }}

                        >
                            <Typography variant="body1" sx={{
                                fontSize: {xs: '6px', sm: '8px', md: '10px'},
                                display: {
                                    xs: 'none',
                                    md: 'inherit'

                                }
                            }}>
                                Отправить
                            </Typography>

                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
        ;
};

const Message = ({message}) => {
    const isBot = message.role === "assistant";

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: isBot ? 'row' : 'row-reverse',
                mb: 2,
            }}
        >
            <Avatar skin="light"
                    sx={{
                        width: 32,
                        height: 32,
                        ml: !isBot ? 1 : undefined,
                        mr: isBot ? 1 : undefined,
                        fontSize: theme => theme.typography.body2.fontSize,
                        fontWeight: 500
                    }}
            >

            </Avatar>
            <Paper
                variant="outlined"
                sx={{
                    p: 1,
                    backgroundColor: isBot ? "#E5E5EA" : "#2ECA1F",
                    borderRadius: 2,
                    borderTopLeftRadius: isBot ? 0 : undefined,
                    borderTopRightRadius: !isBot ? 0 : undefined,
                    border: 'none',
                }}
            >
                <Typography variant="body1">{message.content}</Typography>
            </Paper>
        </Box>
    );
};

export default ChatUI;