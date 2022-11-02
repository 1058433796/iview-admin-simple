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

        <formItem label="月份">
          <Select v-model="filterForm.month" style="width: 200px">
            <Option v-for="item in monthList" :value="item" :key="item">{{
              item
            }}</Option>
          </Select>
        </formItem>
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
import {getFieldList, getTwoDataList} from '@/api/data';

export default {
  name: "two",

  data() {
    return {
      columns: [
        { title: "城市", key: "city" },
        {title: "月份", key: "month"},
        {title: "数量", key:"count"}
      ],
      data: [],
      filterForm: {},
      cityList: [],
      monthList:[],
      page: 1,
    };
  },

  methods: {
    getFieldLists(){
    getFieldList({field: 'city', type: 'String'}).then(res => {
        console.log(res);
        this.cityList = res.data;
    })
    
    getFieldList({field: 'base_info.month', type: 'Integer'}).then(res => {
        console.log(res);
        this.monthList = res.data;
        if(this.monthList)this.monthList = this.monthList.sort((a, b) => a - b);
    })
   },

   getDataList(){
        getTwoDataList({...this.filterForm, page: this.page}).then(res =>{
        console.log('getTwoDataList', res);
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