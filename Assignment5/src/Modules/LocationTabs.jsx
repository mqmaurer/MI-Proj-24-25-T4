const LocationTabs = () => {

    return (
        <ul id="navigation" className="nav nav-tabs nav-fill">
            <li className="nav-item">
                <a className="nav-link" href="#/books">Book List</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#/addBooks">Add Book</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#/details">Book Detail</a>
            </li>
        </ul>
    );
}

export default LocationTabs;