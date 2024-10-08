import { SplideSlide } from '@splidejs/react-splide';

export function Employees({ hour, employees, setEmployee }) {
    console.log(employees);

    return (
        hour.employees.map(employee => {
            return (
                <SplideSlide key={ employee }>
                    <div onClick={() => setEmployee({name: employees[employee].name, id: employees[employee].id })} className='d-f f-1 day h-100 gap-s comp_border txt-c jc-s p-10 employee' >
                        <div className='cabinet_image'></div>
                        <div className='d-f fd-c txt-l gap-s'>
                            {employees[employee].name}
                            <div className='txt-xs'>{employees[employee].position}</div>
                        </div>
                    </div>
                </SplideSlide>
            )
        })
    );
}