import React, { useState, useEffect } from 'react'
import Navbar from '../Layout/Navbar/Navbar'
import Reviews from '../Layout/Reviews/Reviews'
import Pagination from '../Layout/Pagination/Pagination'
import SearchField from '../Layout/SearchField/SearchField'
import Button from '../Layout/Button/Button'
import BtnClasses from '../Layout/Button/Button.module.css'
import Dropdown from '../Layout/Dropdown/Dropdown'
import classes from './Dashboard.module.css'
import axios from 'axios'

const Dashboard = () => {

    // Component States
    const [data, setData] = useState([]);
    const [displayData, setDisplayData] = useState();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortingOrder, setSortingOrder] = useState('')


    // List of options for sorting order
    const options = [
        { label: 'Sort By', value: '' },
        { label: 'Rating ASC', value: 'r_asc' },
        { label: 'Rating DESC', value: 'r_desc' },
        { label: 'Post Date ASC', value: 'pdate_asc' },
        { label: 'Post Date DESC', value: 'pdate_desc' }
    ];


    // Retrieve reviews handler function
    const retrieveData = async () => {
        setLoading(true);
        setCurrentPage(1);
        const resp = await axios.get('/api/retrieve-reviews');
        setData(resp.data);
        setLoading(false);
    }

    // React Hook to set Table data
    let displayTable;
    useEffect(() => {
        if (loading === true) {
            displayTable = <h2>Loading...</h2>;
        }
        else {
            if (data.length !== 0) {
                const indexOfLastReview = currentPage * 5;
                const indexOfFirstReview = indexOfLastReview - 5;
                let currentPageReviews;
                if (searchTerm === '') {
                    currentPageReviews = data.slice(indexOfFirstReview, indexOfLastReview);
                }
                else {
                    currentPageReviews = data.filter((val) => {
                        if (val.content_text.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val;
                        }
                    })
                }
                displayTable = (
                    <div>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">UserName</th>
                                    <th scope="col">Review Creation Date</th>
                                    <th scope="col">Rating</th>
                                    <th scope="col">Review Title</th>
                                    <th scope="col">Review Content</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Reviews reviews={currentPageReviews} loading={loading} />
                            </tbody>
                        </table>
                        {(searchTerm === '') ? <Pagination dataObjectsPerPage={5} totalDataObjects={data.length} paginate={paginate} perviousPage={() => setCurrentPage(currentPage - 1)} nextPage={() => setCurrentPage(currentPage + 1)} currentPage={currentPage} /> : null}
                    </div>)
            }
        }
        setDisplayData(displayTable);
    }, [ data, loading, currentPage, searchTerm]);


    // React Hook to set reviews according to sorting order
    useEffect(() => {
        let sortedData = [];
        switch(sortingOrder) {
            case 'r_asc':
                sortedData = [...data].sort((a,b) => a.usersProductRating > b.usersProductRating ? 1 : -1);
                break;
            case 'r_desc':
                sortedData = [...data].sort((a,b) => a.usersProductRating < b.usersProductRating ? 1 : -1);
                break;
            case 'pdate_asc':
                sortedData = [...data].sort((a,b) => a.creationDate > b.creationDate ? 1 : -1);
                break;
            case 'pdate_desc':
                sortedData = [...data].sort((a,b) => a.creationDate < b.creationDate ? 1 : -1);
                break;
            default:
                sortedData = [...data];
                break;
        }
        setData(sortedData);
    }, [sortingOrder])

    // Sorting order change handler function
    const handleSortingOrderChange = (event) => {
        setSortingOrder(event.target.value);
    };


    // paginate function callback to set current page.
    const paginate = (pageNumber) => setCurrentPage(pageNumber)


    return (
        <div>
            <Navbar />
            <div className={classes.Dashboard}>
                <div className={classes.searchFilter}>
                    <Button btnText="Retrieve" className={[BtnClasses.Button, BtnClasses.btnRetrieve].join(' ')} onClick={retrieveData} />
                    <SearchField onChange={event => { setSearchTerm(event.target.value) }} value={searchTerm} />
                    <Dropdown label="Sort By "
                        options={options}
                        value={sortingOrder}
                        onChange={handleSortingOrderChange} />
                </div>
                <div className="mt-5">
                    {displayData}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
