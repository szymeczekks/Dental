import {Link} from 'react-router-dom';

export const ListElement = ({ name, path='', dropdown=null }) => {

    const dropdownHandle = (e) => {
        e.classList.toggle('show_list');
    }

    return (
        <li onClick={dropdown && (e => dropdownHandle(e.currentTarget))} data-name={name} className={dropdown && "Dropdown p-r"}>
            {!dropdown ? 
                <Link to={path}>
                    <div className='d-f ai-c gap-s p-10 hover-slide p-r link'>
                        <i className="fa-solid fa-gear txt-xl"></i>
                        <p className='p-r f-1 ellipsis-1 fw-500'>{name}</p>
                    </div>
                </Link>
            : 
                <>
                <div className='d-f ai-c gap-s p-10 hover-slide p-r link'>
                    <i className="fa-solid fa-gear txt-xl"></i>
                    <p className='p-r f-1 ellipsis-1 fw-500'>{name}</p>
                    <i className="fa-solid fa-angle-down txt-s" aria-hidden="true"></i>
                </div>
                <div className='Dropdown_list'>
                    <ul>
                        {dropdown.map(element => (
                            <li key={element.path} className='ellipsis-1 link'>
                                <Link to={element.path}>
                                    {element.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                </>
            
            }
        </li>
    )
}