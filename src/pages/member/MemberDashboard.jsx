import { useAuth } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"
import PageHeader from "../../components/PageHeader"
import { FiShoppingBag, FiClipboard, FiAward } from "react-icons/fi"

const TIER_CONFIG = {
    bronze: { discount: 5, nextTier: 'silver', nextThreshold: 1001, color: 'bg-orange-400' },
    silver: { discount: 10, nextTier: 'gold', nextThreshold: 3001, color: 'bg-gray-400' },
    gold: { discount: 15, nextTier: 'platinum', nextThreshold: 7001, color: 'bg-yellow-500' },
    platinum: { discount: 20, nextTier: null, nextThreshold: null, color: 'bg-gray-800' },
}

export default function MemberDashboard() {
    const { profile } = useAuth()

    if (!profile) return <div className="p-4">Loading...</div>

    const tier = profile.tier || 'bronze'
    const config = TIER_CONFIG[tier]
    const progressPercent = config.nextThreshold
        ? Math.min((profile.points / config.nextThreshold) * 100, 100)
        : 100

    return (
        <div>
            <PageHeader
                title="Member Dashboard"
                breadcrumb={["Dashboard"]}
            />

            <div className="p-6 space-y-6">
                {/* Profile Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">
                            {(profile.full_name || profile.email).charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                {profile.full_name || 'Member'}
                            </h2>
                            <p className="text-gray-500 text-sm">{profile.email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <p className="text-sm text-gray-500">Current Tier</p>
                            <p className={`text-lg font-bold capitalize ${config.color} text-white rounded-full px-3 py-1 inline-block mt-1`}>
                                {tier}
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <p className="text-sm text-gray-500">Total Points</p>
                            <p className="text-2xl font-bold text-gray-800 mt-1">{profile.points}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <p className="text-sm text-gray-500">Discount</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">{config.discount}%</p>
                        </div>
                    </div>
                </div>

                {/* Tier Progress */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Tier Progress</h3>
                    {config.nextTier ? (
                        <div>
                            <div className="flex justify-between text-sm text-gray-500 mb-2">
                                <span className="capitalize">{tier}</span>
                                <span className="capitalize">{config.nextTier} ({config.nextThreshold} pts)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div
                                    className={`${config.color} h-4 rounded-full transition-all duration-500`}
                                    style={{ width: `${progressPercent}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                {config.nextThreshold - profile.points} more points to reach <span className="capitalize font-semibold">{config.nextTier}</span>
                            </p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <FiAward className="text-4xl text-yellow-500 mx-auto mb-2" />
                            <p className="text-gray-600">You've reached the highest tier! Enjoy your {config.discount}% discount.</p>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4">
                    <Link
                        to="/member/checkout"
                        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow flex items-center gap-4"
                    >
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <FiShoppingBag className="text-blue-600 text-2xl" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">Shop & Checkout</h3>
                            <p className="text-sm text-gray-500">Browse products and place orders</p>
                        </div>
                    </Link>

                    <Link
                        to="/member/orders"
                        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow flex items-center gap-4"
                    >
                        <div className="p-3 bg-green-100 rounded-lg">
                            <FiClipboard className="text-green-600 text-2xl" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">My Orders</h3>
                            <p className="text-sm text-gray-500">View your order history</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
