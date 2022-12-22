import axios from "axios";

jest.mock("axios");

test('get Notes', async () => {
    const note = [
        {
            "title": "note  2",
            "description": "sure you get what you have asked for",
            "id": "CZLGoYE5gxD-k-oat-BBj"
        }
    ]

    axios.get.mockResolvedValueOnce(note);
});

