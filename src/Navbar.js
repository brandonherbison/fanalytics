



export const Navbar = () => {
    return (
        <>
            <ul className="flex gap-3">
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/receiving-stats">Receiving</a>
                </li>
                <li>
                    <a href="/rushing-stats">Rushing</a>
                </li>
                <li>
                    <a href="/passing-stats">Passing</a>
                </li>
                <li>
                    <a href="/win-stats">Wins</a>
                </li>
            </ul>
        </>
    )
}