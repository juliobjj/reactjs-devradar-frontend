import React, { useState, useEffect } from 'react';

function DevForm({ onSubmit }) {
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                setLatitude(latitude);
                setLongitude(longitude);
            },
            (err) => {
                console.log(err);
            },
            {
                timeout: 30000,
            }
        )
    }, []);

    async function hendleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
        });

        setGithubUsername('');
        setTechs('');
    }

    return (
        <form onSubmit={hendleSubmit}>
            <div className="input-block">
                <label htmlFor="github_username">Usuário Github</label>
                <input
                    type="text"
                    id="github_username"
                    name="github_username"
                    required
                    value={github_username}
                    onChange={e => setGithubUsername(e.target.value)} />
            </div>

            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input
                    type="text"
                    id="techs"
                    name="techs"
                    required
                    value={techs}
                    onChange={e => setTechs(e.target.value)} />
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input
                        type="text"
                        id="latitude"
                        name="latitude"
                        required
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)} />
                </div>

                <div className="input-block">
                    <label htmlFor="longitude">Logitude</label>
                    <input
                        type="text"
                        id="longitude"
                        name="longitude"
                        required
                        value={longitude}
                        onChange={e => setLongitude(e.target.value)} />
                </div>
            </div>
            <button type="submit">Salvar</button>
        </form>
    );
}

export default DevForm;