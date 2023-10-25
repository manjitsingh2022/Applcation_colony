import React from 'react';

function CustomCards({ cardsData }) {
    // const cardsData = [
    //     {
    //         title: 'Short title, long jacket',
    //         imageUrl: 'unsplash-photo-1.jpg',
    //         location: 'Earth',
    //         daysAgo: '3d',
    //     },
    //     {
    //         title: 'Much longer title that wraps to multiple lines',
    //         imageUrl: 'unsplash-photo-2.jpg',
    //         location: 'Pakistan',
    //         daysAgo: '4d',
    //     },
    //     {
    //         title: 'Another longer title belongs here',
    //         imageUrl: 'unsplash-photo-3.jpg',
    //         location: 'California',
    //         daysAgo: '5d',
    //     },
    //     {
    //         title: 'Another longer title belongs here',
    //         imageUrl: 'unsplash-photo-3.jpg',
    //         location: 'California',
    //         daysAgo: '5d',
    //     },
    // ];

    return (
        <div className="container px-4 py-5" id="custom-cards">
            <h2 className="pb-2 border-bottom">Custom cards</h2>
            <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                {cardsData.map((card, index) => (
                    <div className="col" key={index}>
                        <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style={{ backgroundImage: `url(${card.imageUrl})` }}>
                            <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">{card.title}</h3>
                                <ul className="d-flex list-unstyled mt-auto">
                                    <li className="me-auto">
                                        <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32" className="rounded-circle border border-white" />
                                    </li>
                                    <li className="d-flex align-items-center me-3">
                                        <svg className="bi me-2" width="1em" height="1em">
                                            <use xlinkHref="#geo-fill" />
                                        </svg>
                                        <small>{card.location}</small>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <svg className="bi me-2" width="1em" height="1em">
                                            <use xlinkHref="#calendar3" />
                                        </svg>
                                        <small>{card.daysAgo}</small>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CustomCards;
