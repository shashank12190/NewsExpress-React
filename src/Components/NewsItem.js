import React from 'react'

export default function NewsItem(props) {
    let { title, description, urlToImage, url, author, date, source } = props
    return (
        <div className="">
            <div className="card" >
                <div >
                    <span className="badge bg-success" style={{ display: "flex", justifyContent: "flex-end", position: "absolute" }} >
                        {source}
                    </span>
                </div>
                <img src={!urlToImage ? "https://www.reuters.com/resizer/0moKCw0m7Rurdj-Ox5PgAh0A7vw=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/4JUS6AE4RVJFBJQ3OK42VODZRY.jpg" : urlToImage} className="card-img-top" alt="" />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-danger">By:{author ? author : "Unknown"} Published on:{new Date(date).toGMTString()}</small></p>
                    <a href={url} target={'_blank'} rel={'noreferrer'} className="btn btn-dark btn-sm">Read more</a>
                </div>
            </div>
        </div >
    )
}
