
import { AiOutlineBarChart } from 'react-icons/ai';
import { AiOutlineLineChart } from 'react-icons/ai';
import { BsBinocularsFill } from 'react-icons/bs';


export const Home = () => {



    return (
        <>
            <div className="w-full bg-football bg-bottom bg-cover">
                <div className="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 py-36">
                    <div className="text-center">
                        <div className="container px-4 mx-auto">
                            <div className="max-w-4xl mx-auto text-center">
                                <h2 className="mt-8 mb-6 text-6xl font-bold text-gray-100">Welcome to <span className="text-blue-500">Fanalytics</span>!</h2>
                                <p className="max-w-3xl text-2xl mx-auto mb-10 text-gray-300">
                                    An intuitive way for fans to analyze NFL data.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-stone-200 py-24 ">
                <div className="flex justify-evenly w-4/5 m-auto">
                    <div className="w-64 h-64 shadow shadow-lg rounded-xl bg-white border border-blue-500 px-4">
                        <AiOutlineBarChart className="text-7xl text-blue-500 mx-auto mt-8" />
                        <h2 className="text-2xl text-center mt-4">Analyze</h2>
                        <p className="text-center text-gray-500">Analyze NFL data in a way that is easy to understand.</p>
                    </div>
                    <div className="w-64 h-64 shadow shadow-lg rounded-xl bg-white border border-blue-500 px-4">
                        <BsBinocularsFill className="text-7xl text-blue-500 mx-auto mt-8" />
                        <h2 className="text-2xl text-center mt-4">Explore</h2>
                        <p className="text-center text-gray-500">Explore over two decades of team statistics.</p>
                    </div>
                    <div className="w-64 h-64 shadow shadow-lg rounded-xl bg-white border border-blue-500 px-4">
                        <AiOutlineLineChart className="text-7xl text-blue-500 mx-auto mt-8" />
                        <h2 className="text-2xl text-center mt-4">Predict</h2>
                        <p className="text-center text-gray-500">Make predictions for next year based on the information you find.</p>
                    </div>
                </div>
            </div>
        </>
    )
}