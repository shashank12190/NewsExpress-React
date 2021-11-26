import NewsItem from './NewsItem'
import React, { useState, useEffect } from 'react'
import Spinner from './Spinner'
// import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




export default function News(props) {
    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const [loading, setLoading] = useState(true)

    let updateNews = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&category=${props.category}&page=${page}`
        setLoading(true)
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)

    }
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&category=${props.category}&page=${page + 1}`
        setPage(page + 1)
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)}- NewsExpress`
        updateNews()
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div className="container my-4 ">
                <h1 style={{
                    margin: "25px 0px", fontStyle: 'italic',
                    color: "darkblue"
                }} className="text-center"> NEWS EXPRESSS - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            </div>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}

            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title} description={element.description} urlToImage={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}

                    </div>
                </div>
            </InfiniteScroll>


        </>
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
