import React from 'react';

class AboutPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div className="bannerText">
                    <p className="bannerTextTitle">About Book It</p>
                    <p>This is a final project made for ITechArt St.Lab.</p>
                    <p>Contact author: Katerina Akentyeva, katerina.akent@gmail.com. </p>
                </div>
            </React.Fragment>
        );
    }
}

export default AboutPage;