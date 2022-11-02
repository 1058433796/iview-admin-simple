<template>
  <div>
    <Card>
      <Form :model="filterForm" :label-width="100" style="display: flex; margin:20px 0;">
        <formItem label="城市"> </formItem>
        <Select v-model="filterForm.city" style="width: 200px">
          <Option v-for="item in cityList" :value="item" :key="item">{{
            item
          }}</Option>
        </Select>

        <formItem>
            <Button type="warning" @click="query" style="margin-right: 20px;">查询</Button>
            <Button type="warning" @click="reset">重置</Button>
        </formItem>
      </Form>
    </Card>
    <Table :columns="columns" :data="data"></Table>
    <Page :total="1000" :page-size="15" style="width:400px; justify-self: end;" @on-change="pageChange"></Page>
  </div>
</template>

<script>
import {getFieldList, getThreeDataList} from '@/api/data';

export default {
  name: "three",

  data() {
    return {
      columns: [
        { title: "城市", key: "city" },
        {title: "区", key: "district"},
        {title: "数量", key:"count"}
      ],
      data: [],
      filterForm: {},
      cityList: [],
      page: 1,
    };
  },

  methods: {
    getFieldLists(){
    getFieldList({field: 'city', type: 'String'}).then(res => {
        console.log(res);
        this.cityList = res.data;
    })
   },

   getDataList(){
        getThreeDataList({...this.filterForm, page: this.page}).then(res =>{
        console.log('getThreeDataList', res);
        this.data = res.data
    })
   },

   query(){
    this.getDataList();
   },
   reset(){
    this.filterForm = {}
    this.getDataList();
   },
   pageChange(page){
    this.page = page;
    this.getDataList();
   }
  },
    mounted() {
        this.getFieldLists();
        this.getDataList();
    },
};
</script>

<style lang="scss" scoped>
</style>