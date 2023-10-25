const activeLink = 'nav__list-item__link active'
const nonActiveLink = 'nav__list-item__link'

const activeNav = ({ isActive }) => (isActive ? activeLink : nonActiveLink)

export { activeNav }
