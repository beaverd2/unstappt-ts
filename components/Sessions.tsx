/* eslint-disable react/jsx-key */
import dayjs from 'dayjs';
import { Flex, Heading } from '@chakra-ui/layout';
import React, { memo, useState, useEffect } from 'react';
import { Skeleton } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy } from 'react-table';
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from '@chakra-ui/react';
import { IBeers } from '../types/IBeers';

interface SessionsProps {
  beers: IBeers[];
  isLoading: boolean;
}

interface ISessions {
  startTime: string;
  endTime: string;
  total: number;
}

type Data = {
  [index: string]: string[];
};

const Sessions: React.FC<SessionsProps> = ({ beers, isLoading }) => {
  const [sessions, setSessions] = useState<ISessions[]>([]);

  useEffect(() => {
    if (beers) {
      const getSessions = (beers: IBeers[]) => {
        const sortedArray = beers
          .sort((a, b) => a.recent_checkin_id - b.recent_checkin_id)
          .map((beer) => beer.recent_created_at);
        let data: Data = {};
        let counter = 0;
        for (let i = 0; i < sortedArray.length - 1; i++) {
          if (
            dayjs(sortedArray[i + 1]).diff(dayjs(sortedArray[i]), 'hour') < 2
          ) {
            data[counter] =
              data[counter] === undefined
                ? [sortedArray[i], sortedArray[i + 1]]
                : [...data[counter], sortedArray[i], sortedArray[i + 1]];
          } else counter++;
        }
        Object.entries(data).forEach(([key, value]) => {
          data[key] = [...new Set(value)];
        });
        const filteredByValue = Object.fromEntries(
          Object.entries(data).filter(([key, value]) => value.length > 2)
        );
        return Object.values(filteredByValue).map((session) => ({
          startTime: dayjs(session[0]).format('DD MMM YYYY HH:mm'),
          endTime: dayjs(session[session.length - 1]).format(
            'DD MMM YYYY HH:mm'
          ),
          total: session.length,
        }));
      };
      const sessions = getSessions(beers);
      setSessions(sessions);
    }
  }, [beers]);

  const data = React.useMemo(
    () => (isLoading ? Array(3).fill({}) : sessions),
    [isLoading, sessions]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Start time',
        accessor: 'startTime',
      },
      {
        Header: 'End time',
        accessor: 'endTime',
      },
      {
        Header: 'Total drinks',
        accessor: 'total',
        isNumeric: true,
      },
    ],
    []
  );

  const tableColumns = React.useMemo(
    () =>
      isLoading
        ? columns.map((column) => ({
            ...column,
            Cell: <Skeleton h={4} w='100%' />,
          }))
        : columns,
    [isLoading, columns]
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: tableColumns, data }, useSortBy);
  return (
    <Flex
      bgColor='white'
      p={2}
      shadow='base'
      flexDirection='column'
      mx='auto'
      width='100%'
      marginTop={4}
      borderRadius='base'
    >
      <Flex justifyContent='space-between' alignItems='center' marginBottom={2}>
        <Heading size='sm'>Drinking Sessions</Heading>
      </Flex>
      <Flex>
        <Table size='sm' {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    isNumeric={column.Header === 'Total drinks' ? true : false}
                  >
                    {column.render('Header')}
                    <chakra.span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TriangleDownIcon aria-label='sorted descending' />
                        ) : (
                          <TriangleUpIcon aria-label='sorted ascending' />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell, i) => (
                    <Td
                      {...cell.getCellProps()}
                      isNumeric={
                        cell.column.Header === 'Total drinks' ? true : false
                      }
                    >
                      {cell.render('Cell')}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Flex>
    </Flex>
  );
};

export default memo(Sessions);
