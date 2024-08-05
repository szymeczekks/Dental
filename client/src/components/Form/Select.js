import React from 'react'

export function Select({ register, id, options, name }) {
    return (
        <div className='d-f fd-c f-1 gap-s'>
            <label>{name}</label>
            <select className='m-y-5 shadow-m' {...register(id)}>
                {options?.map(option => (
                    <option value={option.name}>{option.name}</option>
                ))}
            </select>
        </div>
    )
}