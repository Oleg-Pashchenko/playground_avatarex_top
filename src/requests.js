import axios from "axios";

export const ChatApi = async (prompt, model, max_tokens, temperature, api_token, use_another_models) => {
    const res = await axios.post('http://147.45.152.172:10001/', {
        "prompt": prompt,
        "model": model,
        "max_tokens": 2000,
        "temperature": 1,
        "api_token": api_token,
        "use_another_models": false

    });

    return res
}