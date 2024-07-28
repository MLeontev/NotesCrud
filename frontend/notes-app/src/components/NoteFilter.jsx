import { Flex, Input, Select } from '@chakra-ui/react';

export default function NoteFilter({ filter, setFilter, totalCount }) {
  return (
    <Flex marginTop='15px' flexDirection='column' gap='2'>
      <Input
        placeholder='Поиск'
        value={filter.search}
        onChange={(e) =>
          setFilter({ ...filter, search: e.target.value, page: 1 })
        }
      />

      <Select
        value={filter.sortItem}
        onChange={(e) =>
          setFilter({ ...filter, sortItem: e.target.value, page: 1 })
        }
      >
        <option value='' disabled>
          Сортировать по
        </option>
        <option value='title'>По названию</option>
        <option value='date'>По дате</option>
      </Select>

      <Select
        value={filter.sortOrder}
        onChange={(e) =>
          setFilter({ ...filter, sortOrder: e.target.value, page: 1 })
        }
      >
        <option value='' disabled>
          Порядок сортировки
        </option>
        <option value='asc'>По возрастанию</option>
        <option value='desc'>По убыванию</option>
      </Select>

      <Select
        value={filter.limit}
        onChange={(e) => {
          setFilter({ ...filter, limit: parseInt(e.target.value), page: 1 });
        }}
      >
        <option value='' disabled>
          Количество записей на странице
        </option>
        <option value='5'>5</option>
        <option value='10'>10</option>
        <option value={totalCount}>Все</option>
      </Select>
    </Flex>
  );
}
