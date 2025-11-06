'use client'

import { useState, useCallback } from 'react'
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  User,
} from '@/lib/hooks/useUsers'
import { UserFormData } from '@/lib/validations/user'
import SearchBar from '@/components/SearchBar'
import UserTable from '@/components/UserTable'
import UserModal from '@/components/UserModal'
import UserForm from '@/components/UserForm'
import DeleteConfirmModal from '@/components/DeleteConfirmModal'

export default function Home() {
  const [search, setSearch] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const { data: users = [], isLoading, error: fetchError } = useUsers(search)
  const createUser = useCreateUser()
  const updateUser = useUpdateUser()
  const deleteUser = useDeleteUser()

  const handleSearch = useCallback((searchTerm: string) => {
    setSearch(searchTerm)
  }, [])

  const handleAddUser = async (data: UserFormData) => {
    try {
      setError(null)
      await createUser.mutateAsync(data)
      setIsAddModalOpen(false)
      setSuccess('User created successfully!')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to create user')
    }
  }

  const handleEditUser = async (data: UserFormData) => {
    if (!selectedUser) return

    try {
      setError(null)
      await updateUser.mutateAsync({ id: selectedUser.id, data })
      setIsEditModalOpen(false)
      setSelectedUser(null)
      setSuccess('User updated successfully!')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to update user')
    }
  }

  const handleDeleteUser = async () => {
    if (!selectedUser) return

    try {
      setError(null)
      await deleteUser.mutateAsync(selectedUser.id)
      setIsDeleteModalOpen(false)
      setSelectedUser(null)
      setSuccess('User deleted successfully!')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to delete user')
    }
  }

  const openEditModal = (user: User) => {
    setSelectedUser(user)
    setIsEditModalOpen(true)
    setError(null)
  }

  const openDeleteModal = (user: User) => {
    setSelectedUser(user)
    setIsDeleteModalOpen(true)
    setError(null)
  }

  const closeModals = () => {
    setIsAddModalOpen(false)
    setIsEditModalOpen(false)
    setIsDeleteModalOpen(false)
    setSelectedUser(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">User Management</h1>
            <button
              onClick={() => {
                setIsAddModalOpen(true)
                setError(null)
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              + Add User
            </button>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          {/* Error Message */}
          {(error || fetchError) && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error || 'Failed to fetch users'}
            </div>
          )}

          <SearchBar onSearch={handleSearch} />

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading users...</p>
            </div>
          ) : (
            <UserTable
              users={users}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
            />
          )}
        </div>
      </div>

      {/* Add User Modal */}
      <UserModal
        isOpen={isAddModalOpen}
        onClose={closeModals}
        title="Add New User"
      >
        <>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          <UserForm
            onSubmit={handleAddUser}
            onCancel={closeModals}
            isSubmitting={createUser.isPending}
          />
        </>
      </UserModal>

      {/* Edit User Modal */}
      <UserModal
        isOpen={isEditModalOpen}
        onClose={closeModals}
        title="Edit User"
      >
        <>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          <UserForm
            user={selectedUser || undefined}
            onSubmit={handleEditUser}
            onCancel={closeModals}
            isSubmitting={updateUser.isPending}
          />
        </>
      </UserModal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeModals}
        onConfirm={handleDeleteUser}
        user={selectedUser}
        isDeleting={deleteUser.isPending}
      />
    </div>
  )
}

