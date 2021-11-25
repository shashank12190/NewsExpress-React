import NewsItem from './NewsItem'
import React, { useState, useEffect } from 'react'
import Spinner from './Spinner'
// import PropTypes from 'prop-types'



export default function News(props) {
    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const [loading, setLoading] = useState(false)

    let updateNews = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&category=${props.category}&page=1`
        setLoading(true)
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData);
        setLoading(false)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
    }
    const handlePrevClick = async () => {
        console.log('previous');
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&category=${props.category}&page=${page - 1}`
        setLoading(true)
        let data = await fetch(url)
        let parsedData = await data.json()
        setLoading(false)
        setArticles(parsedData.articles)
        setPage(page - 1)

    }
    const handleNextClick = async () => {
        if (page + 1 > Math.ceil(totalResults / props.pageSize)) {

        } else {
            console.log('next');
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&category=${props.category}&page=${page + 1}`
            setLoading(true)
            let data = await fetch(url)
            let parsedData = await data.json()
            setLoading(false)
            setArticles(parsedData.articles)
            setPage(page + 1)
        }
    }
    useEffect(() => {
        updateNews()

    }, [])
    return (
        <div className="container">
            <div className="container my-2 ">
                <h1 className="text-center"> NEWS EXPRESSS - Top News</h1>
            </div>
            {loading && <Spinner />}
            <div className="row">
                {!loading && articles.map((element) => {
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title} description={element.description} urlToImage={element.urlToImage} url={element.url} />
                    </div>
                })}

            </div>

            {/* Previous and next buttons */}
            <div className="container d-flex justify-content-around my-4">
                <button disabled={page <= 1} onClick={handlePrevClick} type="button" className="btn btn-dark">&larr;	Previous</button>
                <button disabled={(page + 1 > Math.ceil(totalResults / props.pageSize))} onClick={handleNextClick} type="button" className="btn btn-dark">Next&rarr;	</button>
            </div>
        </div>
    )
}
News.defaultProps = {
    country: "in",
    pageSize: 9
}
// News.PropTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number
// }
