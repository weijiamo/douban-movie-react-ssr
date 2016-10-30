import React from 'react';
import MovieItem from '../../components/MovieItem/';
import { loadMovieList } from '../../actions/movieList';
import { connect } from 'react-redux';
import Loading from '../../components/Loading';
import './Home.css';

class Home extends React.PureComponent {

    static loadData(option) {
        if (option && option.store) {
            return option.store.dispatch(loadMovieList());
        } else {
            this.props.loadMovieList();
        }
    }

    constructor(props) {
        super(props);
        this.handleTouchEnd = this.handleTouchEnd.bind(this)
    }

    handleTouchEnd(e) {
        // console.log('handleTouchEnd', e.deltaMode)
        // console.log('handleTouchEnd', e.deltaX)
        // console.log('handleTouchEnd', e.deltaY)
        // console.log('handleTouchEnd', e.deltaZ)
        var t = document.documentElement.scrollTop || document.body.scrollTop;  //离上方的距离
        var h =window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //可见宽度
        if( t >= document.documentElement.scrollHeight -h ) {
            console.log("goooo!");
            Home.loadData.call(this);
        }
    }

    componentWillMount() {
        // Home.loadData.call(this);
    }

    render() {
        const { movies, isLoading } = this.props.movieList;
        const movieList = movies.map(movie => 
        (<li key={movie.id}>
            <MovieItem  movie={movie} />
        </li>));

        return (
            <div className="movie_list">
                <h1>douban movies top50 with React server side rendering</h1>
                {isLoading && Loading()}
                {!isLoading && 
                <ol className="grid_view" ref="home-list" onWheel={this.handleTouchEnd}>
                    {movieList}
                </ol> 
                }
                {isLoading && Loading()}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const { movieList } = state;
    return {
        movieList,
    };
}

export default connect(mapStateToProps, {
    loadMovieList,
})(Home);
