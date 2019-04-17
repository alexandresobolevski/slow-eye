/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import {
  head, prop, path,
} from 'ramda';
import PlayerName from '../PlayerName';
import TeamLogo from '../TeamLogo';
import { toLowerCaseAndMatch } from '../../utils/filter';
import 'react-table/react-table.css';
import './styles.scss';

const DraftTable = ({
  draft, filters, year, round, pageLength, loading,
}) => (
  <ReactTable
    data={draft}
    loading={loading}
    resizable={false}
    filtered={[
      {
        id: 'position',
        value: filters.posSelected,
      },
      {
        id: 'countryCode',
        value: filters.natSelected,
      },
      {
        id: 'nationality',
        value: filters.natSelected,
      },
      {
        id: 'roundNumber',
        value: filters.roundSelected,
      },
      {
        id: 'team',
        value: filters.teamSelected,
      },
    ]}
    noDataText="No draft picks found for criteria"
    columns={[
      {
        Header: 'Rd.',
        id: 'roundNumber',
        className: 'text-left',
        accessor: prop('round'),
        maxWidth: 40,
        minWidth: 40,
      },
      {
        Header: 'Pick',
        id: 'overallPcikNumber',
        className: 'text-left',
        accessor: prop('overallNumber'),
        maxWidth: 50,
        minWidth: 50,
      },
      {
        Header: 'Drafted By',
        id: 'team',
        accessor: path(['pickedBy', 'abbreviation']),
        className: 'text-left team-cell',
        maxWidth: 250,
        minWidth: 175,
        Cell: row => (
          <div>
            <TeamLogo teamId={row.original.pickedBy.id} season={Number(`${year}${year + 1}`)} />
            {row.original.pickedBy.name}
          </div>
        ),
      },
      {
        Header: 'Name',
        id: 'fullName',
        accessor: prop('name'),
        className: 'text-left',
        maxWidth: 200,
        minWidth: 150,
        Cell: row => <PlayerName id={row.original.id} name={row.value} />,
      },
      {
        Header: 'Pos.',
        id: 'position',
        accessor: prop('position'),
        className: 'text-left',
        maxWidth: 85,
        minWidth: 85,
        filterMethod: (filter, row) => {
          if (filter.value === 'S') {
            return row[filter.id] !== 'G';
          }
          if (filter.value === 'F') {
            return row[filter.id] === 'C' || row[filter.id] === 'LW' || row[filter.id] === 'RW';
          }
          return toLowerCaseAndMatch(filter, row);
        },
      },
      {
        Header: 'Nat.',
        id: 'nationality',
        accessor: prop('countryCode'),
        className: 'text-left team-cell',
        maxWidth: 75,
        minWidth: 50,
        Cell: row => (
          <img src={`/images/country/${row.value}.svg`} alt="" />
        ),
      },
      {
        Header: 'Height',
        id: 'height',
        accessor: prop('height'),
        className: 'text-left team-cell',
        maxWidth: 75,
        minWidth: 50,
        Cell: row => (
          <span>
            {`${Math.floor(row.value / 12)}' `}
            {`${Math.floor(row.value % 12)}"`}
          </span>
        ),
      },
      {
        Header: 'Weigth',
        id: 'weight',
        accessor: prop('weight'),
        className: 'text-left team-cell',
        maxWidth: 75,
        minWidth: 50,
      },
      {
        Header: 'League',
        id: 'amateurLeague',
        accessor: prop('amateurLeague'),
        className: 'text-left',
        maxWidth: 125,
        minWidth: 125,
      },
      {
        Header: 'Am. Team',
        id: 'amateurClubName',
        accessor: prop('amateurClubName'),
        className: 'text-left',
        maxWidth: 200,
        minWidth: 200,
      },
    ]}
    defaultSortAsc
    showPagination
    className="draft-table"
    pageSize={pageLength || 30}
    defaultPageSize={30}
  />
);

export default DraftTable;
