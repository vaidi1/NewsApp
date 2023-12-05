import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {

//export class News extends Component {
  // static defaultProps = {
  //   country: "in",
  //   pageSize: 8,
  //   category: "general",
  // };
  // static propTypes = {
  //   country: PropTypes.string,
  //   pageSize: PropTypes.number,
  //   category: PropTypes.string,
  // };

  const [articles,setArticles] = useState([])
  const [loading,setLoading] = useState(true)
  const [page,setPage] = useState(1)
  const [totalResults,setTotalResults] = useState(0)

  const capitalFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     articles: [],
  //     loading: true,
  //     page: 1,
  //     totalResults: 0,
  //   };
  //   document.title = `${this.capitalFirstLetter(
  //     this.props.category
  //   )} - NewsMonkey`;
  // }

  const updateNews = async ()=> {
    props.setProgress(10);
     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=10006079cd20438ab50a0ae37ef3efe0&page=${page}&pageSize=${props.pageSize}`;
     setLoading(true)
     let data = await fetch(url);
     props.setProgress(30);
     let parsedData = await data.json();
     props.setProgress(70);
     setArticles(parsedData.articles)
     setTotalResults(parsedData.totalResults)
     setLoading(false)

     props.setProgress(100);
  }

  // async updateNews() {
  //   this.props.setProgress(10);
  //   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=10006079cd20438ab50a0ae37ef3efe0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   this.props.setProgress(30);
  //   let parsedData = await data.json();
  //   this.props.setProgress(70);
  //   console.log(parsedData);
  //   this.setState({
  //     articles: parsedData.articles,
  //     totalResults: parsedData.totalResults,
  //     loading: false,
  //   });
  //   this.props.setProgress(100);
  // }

  useEffect(() => {
    document.title = `${capitalFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
  },[])
  

  // async componentDidMount() {
  //   this.updateNews();
  // }

  /*const handlePrevClick = async () => {
    setPage(page-1)
    updateNews()
  }*/

  // handlePrevClick = async () => {
  //   // console.log("prev"
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=10006079cd20438ab50a0ae37ef3efe0&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   // this.setState({loading: true});
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json()
  //   // console.log(parsedData);
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parsedData.articles,
  //   //   loading: false
  //   // })
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };

  /*const handleNextClick = async () => {
    setPage(page+1)
    updateNews()
  }*/

  // const handleNextClick = async () => {
  //   //   console.log("next");
  //   //   if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))
  //   //   }
  //   //   else{
  //   //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=10006079cd20438ab50a0ae37ef3efe0&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   //     this.setState({loading: true});
  //   //     let data = await fetch(url);
  //   //     let parsedData = await data.json()
  //   //     console.log(parsedData);
  //   //     this.setState({
  //   //       page: this.state.page + 1,
  //   //       articles: parsedData.articles,
  //   //       loading: false
  //   //     })
  //   // }
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=10006079cd20438ab50a0ae37ef3efe0&page=${page+1}&pageSize=${props.pageSize}`
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    /*console.log(parsedData);*/
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  }

  // fetchMoreData = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=10006079cd20438ab50a0ae37ef3efe0&page=${this.state.page}&pageSize=${this.props.pageSize}`;

  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   /*console.log(parsedData);*/
  //   this.setState({
  //     articles: this.state.articles.concat(parsedData.articles),
  //     totalResults: parsedData.totalResults,
  //   });
  // };

  //render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "90px 0px" }}>
          NewsMonkey - Top {capitalFirstLetter(props.category)} {" "}
          Headlines
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles?.length}
          next={fetchMoreData}
          hasMore={articles?.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row my-3">
              {articles?.length > 0 && articles.map((element, key) => {
                return (
                  <div className="col-md-4" key={key}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={element.description? element.description: ""}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  //}
//}
}

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
