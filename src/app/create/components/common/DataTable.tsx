'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { ReactNode } from 'react'
import Loader from './Loader'

export type DataTableColumn<T> = {
  key: keyof T
  header: string
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode
  align?: 'left' | 'right' | 'center'
}

type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

type DataTableProps<T> = {
  columns: DataTableColumn<T>[]
  data: T[]
  footer?: ReactNode
  pagination?: PaginationProps
  maxHeight?: string
  loading?: boolean
}

export function DataTable<T>({
  columns,
  data,
  footer,
  pagination,
  maxHeight = '88vh',
  loading = false
}: DataTableProps<T>) {
  return (
    <div className="w-full">
      <div
        className="rounded-lg border overflow-y-auto"
        style={{ maxHeight }}
      >
        <Table>
       
          <TableHeader>
            <TableRow>
              {columns.map(col => (
                <TableHead
                  key={String(col.key)}
                  className={col.align === 'right' ? 'text-right' : undefined}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <tbody className="relative">
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map(col => (
                  <TableCell
                    key={String(col.key)}
                    className={col.align === 'right' ? 'text-right' : undefined}
                  >
                    {col.render
                      ? col.render(row[col.key], row, rowIndex)
                      : String(row[col.key] ?? '')}
                  </TableCell>
                ))}
              </TableRow>
            ))}

           
            {loading && (
              <tr className="absolute inset-0 z-20">
                <td colSpan={columns.length}>
                  <div className="flex h-full w-full items-center justify-center bg-background/60">
                    <Loader />
                  </div>
                </td>
              </tr>
            )}
          </tbody>

          {footer && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={columns.length}>
                  {footer}
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>

      {pagination && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => pagination.onPageChange(pagination.page - 1)}
              />
            </PaginationItem>

            {[...Array(pagination.totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={pagination.page === i + 1}
                  onClick={() => pagination.onPageChange(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {pagination.totalPages > 5 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => pagination.onPageChange(pagination.page + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
