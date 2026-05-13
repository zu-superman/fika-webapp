<template>
  <div class="dashboard-container">
    <el-row :gutter="20" class="stats-cards">
      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon user">
              <el-icon><User /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">1,234</div>
              <div class="stat-label">总用户数</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon order">
              <el-icon><ShoppingCart /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">567</div>
              <div class="stat-label">今日订单</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon revenue">
              <el-icon><Money /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">¥89,123</div>
              <div class="stat-label">今日收入</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon activity">
              <el-icon><TrendCharts /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">98.5%</div>
              <div class="stat-label">活跃度</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="data-section">
      <el-col :xs="24" :md="16">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>访问趋势</span>
              <el-button type="primary" size="small">查看详情</el-button>
            </div>
          </template>
          <div class="chart-placeholder">
            <p>图表区域（可集成 ECharts 等图表库）</p>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :md="8">
        <el-card class="activity-card">
          <template #header>
            <div class="card-header">
              <span>最近活动</span>
            </div>
          </template>
          <el-timeline>
            <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp"
              placement="top">
              <el-card>
                <h4>{{ activity.title }}</h4>
                <p>{{ activity.content }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="table-card">
      <template #header>
        <div class="card-header">
          <span>最新订单</span>
          <el-button type="primary" size="small">查看全部</el-button>
        </div>
      </template>
      <el-table :data="orderData" style="width: 100%">
        <el-table-column prop="orderId" label="订单号" width="180" />
        <el-table-column prop="customer" label="客户" width="180" />
        <el-table-column prop="amount" label="金额" width="180" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期" />
        <el-table-column label="操作" width="120">
          <template #default>
            <el-button size="small" type="primary">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activities = ref([
  {
    title: '用户注册',
    content: '新用户张三完成了注册',
    timestamp: '2024-01-15 10:30'
  },
  {
    title: '订单完成',
    content: '订单 #12345 已完成配送',
    timestamp: '2024-01-15 09:15'
  },
  {
    title: '系统更新',
    content: '系统版本更新至 v2.1.0',
    timestamp: '2024-01-14 18:00'
  },
  {
    title: '异常警告',
    content: '服务器 CPU 使用率超过 80%',
    timestamp: '2024-01-14 15:45'
  }
])

const orderData = ref([
  {
    orderId: 'ORD20240115001',
    customer: '张三',
    amount: '¥299.00',
    status: '已完成',
    date: '2024-01-15'
  },
  {
    orderId: 'ORD20240115002',
    customer: '李四',
    amount: '¥599.00',
    status: '处理中',
    date: '2024-01-15'
  },
  {
    orderId: 'ORD20240115003',
    customer: '王五',
    amount: '¥199.00',
    status: '待支付',
    date: '2024-01-15'
  },
  {
    orderId: 'ORD20240115004',
    customer: '赵六',
    amount: '¥899.00',
    status: '已完成',
    date: '2024-01-14'
  },
  {
    orderId: 'ORD20240115005',
    customer: '孙七',
    amount: '¥399.00',
    status: '已取消',
    date: '2024-01-14'
  }
])

function getStatusType(status) {
  const statusMap = {
    '已完成': 'success',
    '处理中': 'warning',
    '待支付': 'info',
    '已取消': 'danger'
  }
  return statusMap[status] || 'info'
}
</script>

<style scoped>
.dashboard-container {
  padding: 16px;
}

.stats-cards {
  margin-bottom: 20px;
}

.stat-card {
  margin-bottom: 20px;
}

.stat-content {
  display: flex;
  align-items: center;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  font-size: 24px;
  color: #fff;
}

.stat-icon.user {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-icon.order {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.stat-icon.revenue {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.stat-icon.activity {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

.data-section {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  border-radius: 4px;
  color: #909399;
}

.activity-card :deep(.el-timeline) {
  max-height: 400px;
  overflow-y: auto;
}

.table-card {
  margin-top: 20px;
}
</style>
