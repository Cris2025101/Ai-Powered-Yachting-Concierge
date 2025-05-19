"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit2, Calendar, Gift, ChevronRight, Save, X } from "lucide-react"

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<any>(null)
  const [bookings, setBookings] = useState<any[]>([])
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    getProfile()
    getBookings()

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/auth')
      } else if (session) {
        getProfile()
        getBookings()
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function getProfile() {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()

      if (userError || !user) {
        router.push('/auth')
        return
      }

      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError) {
        // If profile doesn't exist, create it
        if (profileError.code === 'PGRST116') {
          const { data: newProfile, error: createError } = await supabase
            .from('user_profiles')
            .insert([
              {
                id: user.id,
                full_name: user.user_metadata?.full_name || '',
                email: user.email,
                avatar_url: user.user_metadata?.avatar_url || '',
                loyalty_coins: 0,
                phone_number: '',
                address: '',
                preferences: {}
              }
            ])
            .select()
            .single()

          if (!createError && newProfile) {
            setProfile(newProfile)
            setEditedProfile(newProfile)
          } else {
            throw createError
          }
        } else {
          throw profileError
        }
      } else {
        setProfile(profile)
        setEditedProfile(profile)
      }
    } catch (error) {
      console.error('Error loading profile:', error)
      router.push('/auth')
    } finally {
      setLoading(false)
    }
  }

  async function getBookings() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: bookings, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (!error && bookings) {
        setBookings(bookings)
      }
    } catch (error) {
      console.error('Error loading bookings:', error)
    }
  }

  async function updateProfile() {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(editedProfile)
        .eq('id', profile.id)

      if (error) throw error

      setProfile(editedProfile)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-trend-yellow"></div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Profile Not Found</h2>
          <p className="text-white/70">Please sign in to view your profile.</p>
        </div>
      </div>
    )
  }

  return (
    <section className="py-12 md:py-16 flex items-start justify-center relative">
      <div className="w-[85%] md:w-[75%] mx-auto relative z-10 px-3 sm:px-4 md:px-6">
        <motion.div
          className="flex flex-col space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Profile Header */}
          <motion.div
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="relative z-10 flex items-center gap-6">
              <Avatar className="h-24 w-24 border-2 border-trend-yellow/20">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="bg-trend-yellow/20 text-trend-yellow">
                  {profile?.full_name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white mb-1">{profile?.full_name}</h1>
                <p className="text-white/70">{profile?.email}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-trend-yellow/20 text-trend-yellow text-sm">
                    {profile?.loyalty_coins || 0} SeaMiles
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid grid-cols-3 gap-4 bg-white/5 backdrop-blur-md border border-white/10">
              <TabsTrigger value="profile" className="data-[state=active]:bg-trend-yellow/20 data-[state=active]:text-trend-yellow">
                Profile Information
              </TabsTrigger>
              <TabsTrigger value="bookings" className="data-[state=active]:bg-trend-yellow/20 data-[state=active]:text-trend-yellow">
                My Bookings
              </TabsTrigger>
              <TabsTrigger value="loyalty" className="data-[state=active]:bg-trend-yellow/20 data-[state=active]:text-trend-yellow">
                Loyalty Program
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <motion.div
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-white">Profile Information</h2>
                      <p className="text-white/70">Manage your personal information and preferences</p>
                    </div>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-trend-yellow/20 text-trend-yellow hover:bg-trend-yellow/30 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setIsEditing(false)
                            setEditedProfile(profile)
                          }}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                        <button
                          onClick={updateProfile}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-trend-yellow/20 text-trend-yellow hover:bg-trend-yellow/30 transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-white/70">Full Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedProfile.full_name}
                            onChange={(e) => setEditedProfile({ ...editedProfile, full_name: e.target.value })}
                            className="w-full mt-1 backdrop-blur-md bg-white/5 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-trend-yellow focus:border-trend-yellow"
                          />
                        ) : (
                          <p className="mt-1 text-white">{profile.full_name}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium text-white/70">Email</label>
                        <p className="mt-1 text-white">{profile.email}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-white/70">Phone Number</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={editedProfile.phone_number}
                            onChange={(e) => setEditedProfile({ ...editedProfile, phone_number: e.target.value })}
                            className="w-full mt-1 backdrop-blur-md bg-white/5 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-trend-yellow focus:border-trend-yellow"
                          />
                        ) : (
                          <p className="mt-1 text-white">{profile.phone_number || 'Not added'}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium text-white/70">Member Since</label>
                        <p className="mt-1 text-white">{new Date(profile.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="bookings">
              <motion.div
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-white">My Bookings</h2>
                      <p className="text-white/70">View and manage your bookings</p>
                    </div>
                  </div>

                  {bookings.length > 0 ? (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <motion.div
                          key={booking.id}
                          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-4"
                          whileHover={{ y: -2, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-white">{booking.boat_name}</h3>
                              <p className="text-white/70">
                                {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-trend-yellow font-semibold">€{booking.total_price}</div>
                              <div className="text-sm text-white/70">{booking.status}</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-white/30 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">No Bookings Yet</h3>
                      <p className="text-white/70">Start planning your next adventure!</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="loyalty">
              <motion.div
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-white">Loyalty Program</h2>
                      <p className="text-white/70">Track your SeaMiles and redeem rewards</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">Your Balance</h3>
                          <p className="text-white/70">Available SeaMiles</p>
                        </div>
                        <div className="text-3xl font-bold text-trend-yellow">
                          {profile.loyalty_coins || 0}
                        </div>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-trend-yellow/50 rounded-full"
                          style={{ width: `${Math.min((profile.loyalty_coins || 0) / 100 * 100, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-white/70 mt-2">
                        {100 - (profile.loyalty_coins || 0)} SeaMiles until next reward
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* 50 SeaMiles Options */}
                      <motion.div
                        className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-4"
                        whileHover={{ y: -2, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-trend-yellow/20 flex items-center justify-center">
                            <Gift className="w-5 h-5 text-trend-yellow" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">Training Access</h3>
                            <p className="text-sm text-white/70">50 SeaMiles</p>
                          </div>
                        </div>
                        <p className="text-sm text-white/70 mb-3">
                          Get full access to all online learning modules and training resources.
                        </p>
                        <button
                          className="w-full py-2 rounded-lg bg-trend-yellow/20 text-trend-yellow font-medium flex items-center justify-center hover:bg-trend-yellow/30 transition-colors"
                          disabled={profile.loyalty_coins < 50}
                        >
                          Redeem
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </motion.div>

                      <motion.div
                        className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-4"
                        whileHover={{ y: -2, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-trend-yellow/20 flex items-center justify-center">
                            <Gift className="w-5 h-5 text-trend-yellow" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">€150 Discount</h3>
                            <p className="text-sm text-white/70">50 SeaMiles</p>
                          </div>
                        </div>
                        <p className="text-sm text-white/70 mb-3">
                          Receive a €150 discount on your next charter booking.
                        </p>
                        <button
                          className="w-full py-2 rounded-lg bg-trend-yellow/20 text-trend-yellow font-medium flex items-center justify-center hover:bg-trend-yellow/30 transition-colors"
                          disabled={profile.loyalty_coins < 50}
                        >
                          Redeem
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </motion.div>

                      {/* 100 SeaMiles Options */}
                      <motion.div
                        className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-4"
                        whileHover={{ y: -2, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-trend-yellow/20 flex items-center justify-center">
                            <Gift className="w-5 h-5 text-trend-yellow" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">Club Training Boat</h3>
                            <p className="text-sm text-white/70">100 SeaMiles</p>
                          </div>
                        </div>
                        <p className="text-sm text-white/70 mb-3">
                          Access our Club Training Boat for 7 days free of charge, plus a certified RYA instructor for 7 days focused on sailing skills, navigation, or boat handling.
                        </p>
                        <button
                          className="w-full py-2 rounded-lg bg-trend-yellow/20 text-trend-yellow font-medium flex items-center justify-center hover:bg-trend-yellow/30 transition-colors"
                          disabled={profile.loyalty_coins < 100}
                        >
                          Redeem
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </motion.div>

                      <motion.div
                        className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-4"
                        whileHover={{ y: -2, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-trend-yellow/20 flex items-center justify-center">
                            <Gift className="w-5 h-5 text-trend-yellow" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">€400 Discount</h3>
                            <p className="text-sm text-white/70">100 SeaMiles</p>
                          </div>
                        </div>
                        <p className="text-sm text-white/70 mb-3">
                          Receive a €400 discount on your next charter booking.
                        </p>
                        <button
                          className="w-full py-2 rounded-lg bg-trend-yellow/20 text-trend-yellow font-medium flex items-center justify-center hover:bg-trend-yellow/30 transition-colors"
                          disabled={profile.loyalty_coins < 100}
                        >
                          Redeem
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
} 