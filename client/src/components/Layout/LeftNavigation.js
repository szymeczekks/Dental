import './LeftNavigation.css';

export const SidePanel = ({ object,  children }) => {
    return (
        <div className="left-navigation d-f fd-c txt-l txt-m">
            <div className="profile_container d-f gap-s ai-c">
                <div className="profile_photo"></div>
                <div className='profile_info'>
                {object?.username ? 
                    <>
                        <div className='fw-500 ellipsis-3'>{object.username}</div>
                        <div className='user__email txt-xs'>{object.email}</div>
                    </> : 
                    <h2 className='fw-500 ellipsis-3'>{object && object.name}</h2>}
                </div>
            </div>
            <div className='user__list'>
                <ul>
                    {children}
                </ul>
            </div>
        </div>
    )
}
