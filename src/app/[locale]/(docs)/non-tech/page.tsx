import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { TryItCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Non-Technical Use Cases" };

export default async function NonTechPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="non-tech"
        locale={locale}
        translated
        dek="市场营销、人力资源、财务、运营、客户服务——六个非工程部门，按部门而不是职位来组织。"
      >
        <p>
          一个值得借鉴的框架是：只要一项任务涉及读取某种结构化的输入、产出某种结构化的
          输出，Claude Code 就能派上用场——这覆盖的范围远远超出软件工程本身。大多数
          行政事务繁重的部门，做的正是这种形状的工作——输入表格，产出报告；输入政策文本，
          产出干净的摘要。
        </p>

        <h2>市场营销</h2>
        <ul>
          <li>从一份campaign brief生成广告文案、落地页文案和 A/B 测试假设</li>
          <li>把一篇长文改写成博客、社交媒体、邮件和视频脚本等多种版本</li>
          <li>SEO 审查以及围绕关键词优化的改写大纲</li>
        </ul>

        <h2>人力资源</h2>
        <ul>
          <li>把一份岗位大纲变成结构化的职位描述，让所有招聘信息格式保持一致</li>
          <li>对照评分表总结候选人简历，标记出差距而不是直接给人排名</li>
          <li>为特定岗位或团队定制入职清单和第一周日程安排</li>
          <li>把一大段政策文本（休假、报销、远程办公）转换成员工真正读得下去的可搜索 FAQ</li>
          <li>把匿名的调查或离职访谈回复，整理成带主题标签的摘要提供给管理层</li>
        </ul>

        <h2>财务</h2>
        <ul>
          <li>把银行对账单和发票解析成带校验的结构化记账条目</li>
          <li>核对两份导出数据（例如银行流水与内部账本），只列出其中的差异</li>
          <li>把预算表格转换成大白话写的差异报告——发生了什么变化，以及为什么很可能会这样变化</li>
          <li>根据收据数据，为审批人起草费用政策例外情况的初步说明</li>
          <li>搭建一份追踪&ldquo;已完成 vs. 待处理&rdquo;的周期性月末结账清单</li>
        </ul>

        <h2>法务与合规</h2>
        <ul>
          <li>根据模板和以往提交的材料起草合规文件和监管申报材料</li>
          <li>合同分析——关键条款、与标准模板的偏差、义务摘要</li>
          <li>把新合同和组织标准条款进行红线对比，标记出每一处偏差</li>
        </ul>

        <h2>运营</h2>
        <ul>
          <li>把 PDF、发票和表格中的结构化数据提取到内部系统中</li>
          <li>连接遗留工具和现代 API 的轻量级适配器</li>
          <li>自动生成的每周或每月运营报告</li>
          <li>把每次格式都不统一的供应商数据标准化</li>
          <li>在完整系统显得杀鸡用牛刀时，搭建一个轻量级的内部追踪工具（请求、审批、库存）</li>
        </ul>

        <h2>客户服务</h2>
        <ul>
          <li>用团队真实的语气，为常见工单类别起草回复模板</li>
          <li>把一段很长的支持对话总结成一段交接给下一位客服或升级处理的说明</li>
          <li>把一周的工单整理成一份主题报告——哪些是趋势性问题，哪些只是个别情况</li>
          <li>从零散的历史解决方案和团队经验中，构建一个可搜索的内部 FAQ</li>
          <li>为不断壮大的支持团队起草保持一致口径的宏／常用回复</li>
        </ul>

        <h2>产品／设计</h2>
        <ul>
          <li>把描述出来的 Figma 设计稿变成一个可运行的 React 原型</li>
          <li>从产品规格中穷举边界情况和失败模式清单</li>
          <li>基于现有组件库生成的视觉回归和无障碍性审查</li>
        </ul>

        <TryItCallout locale={locale}>
          粘贴一段政策文本——休假政策、报销指南，任何把真实规则藏在大段文字里的内容——
          然后问：&ldquo;把这个转换成一份简短的 FAQ，列出 8-10 个员工真的会问的问题，
          用大白话回答，并标记出任何含糊不清的地方，而不是自己去猜。&rdquo;
        </TryItCallout>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="non-tech"
      locale={locale}
      dek="Marketing, HR, Finance, Operations, Customer Service — six non-engineering departments, organized by department rather than job title."
    >
      <p>
        The framing worth borrowing: Claude Code is useful anywhere a task involves reading
        structured-ish input and producing a structured-ish output, which covers a lot more ground
        than software engineering alone. Most admin-heavy departments run on exactly that shape of
        work — spreadsheets in, reports out; policy in, a clean summary out.
      </p>

      <h2>Marketing</h2>
      <ul>
        <li>Ad copy, landing-page copy, and A/B hypothesis generation from a campaign brief</li>
        <li>Repurposing one long-form piece into blog, social, email, and video-script variants</li>
        <li>SEO audits and keyword-optimized rewrite outlines</li>
      </ul>

      <h2>Human Resources</h2>
      <ul>
        <li>Turning a role outline into a structured job description, with a consistent format across postings</li>
        <li>Summarizing candidate resumes against a scorecard, flagging gaps rather than ranking people outright</li>
        <li>Drafting onboarding checklists and first-week schedules tailored to a specific role or team</li>
        <li>Converting a wall of policy text (leave, expense, remote-work) into a searchable FAQ employees can actually read</li>
        <li>Compiling anonymized survey or exit-interview responses into theme-tagged summaries for leadership</li>
      </ul>

      <h2>Finance</h2>
      <ul>
        <li>Parsing bank statements and invoices into structured accounting entries with validation</li>
        <li>Reconciling two exports (e.g. a bank feed vs. an internal ledger) and listing only the discrepancies</li>
        <li>Turning a budget spreadsheet into a plain-language variance report — what changed, and why it likely changed</li>
        <li>Drafting first-pass expense-policy exception explanations for approvers, based on receipt data</li>
        <li>Building a recurring monthly close checklist that tracks what's done vs. outstanding</li>
      </ul>

      <h2>Legal &amp; Compliance</h2>
      <ul>
        <li>Drafting compliance documents and regulatory filings from templates and prior submissions</li>
        <li>Contract analysis — key clauses, deviations from a standard template, obligation summaries</li>
        <li>Redlining a new contract against your organization's standard clauses and flagging every deviation</li>
      </ul>

      <h2>Operations</h2>
      <ul>
        <li>Extracting structured data from PDFs, invoices, and spreadsheets into internal systems</li>
        <li>Lightweight adapters bridging legacy tools and modern APIs</li>
        <li>Automatically compiled weekly or monthly operational reports</li>
        <li>Standardizing vendor or supplier data that arrives in inconsistent spreadsheet formats every time</li>
        <li>Building a lightweight internal tracker (requests, approvals, inventory) when a full system is overkill</li>
      </ul>

      <h2>Customer Service</h2>
      <ul>
        <li>Drafting response templates for common ticket categories, in the team's actual tone of voice</li>
        <li>Summarizing a long support thread into a one-paragraph handoff note for the next agent or escalation</li>
        <li>Turning a week of tickets into a themed report — what's trending, what's a one-off</li>
        <li>Building a searchable internal FAQ from scattered past resolutions and tribal knowledge</li>
        <li>Drafting macros/canned responses that stay consistent across a growing support team</li>
      </ul>

      <h2>Product / Design</h2>
      <ul>
        <li>Turning a described Figma mockup into a working React prototype</li>
        <li>Exhaustive edge-case and failure-mode lists from a product spec</li>
        <li>Visual-regression and accessibility audits generated from existing component libraries</li>
      </ul>

      <TryItCallout>
        Paste a page of policy text — leave policy, an expense guideline, anything with real
        rules buried in prose — and ask: &ldquo;Turn this into a short FAQ with 8-10 questions an
        employee would actually ask, plain-language answers, and flag anything ambiguous rather
        than guessing.&rdquo;
      </TryItCallout>
    </ContentPage>
  );
}
