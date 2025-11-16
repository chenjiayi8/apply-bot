import { useState } from 'react'
import { usePlaywrightConnection } from '../hooks/usePlaywrightConnection'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TrendingUp, Users, FileText, Activity } from 'lucide-react'

export default function Dashboard() {
  const { status, connect, disconnect } = usePlaywrightConnection()
  const [mcpRelayUrl, setMcpRelayUrl] = useState('ws://localhost:3000')

  const handleConnect = async () => {
    await connect(mcpRelayUrl)
  }

  const handleDisconnect = async () => {
    await disconnect()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h2>

        {/* Extension Status Indicator */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
          status.extensionInstalled
            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            status.extensionInstalled ? 'bg-green-600 dark:bg-green-400' : 'bg-gray-400'
          }`} />
          <span className="text-sm font-medium">
            {status.extensionInstalled ? 'Extension Active' : 'Extension Inactive'}
          </span>
        </div>
      </div>

      {/* Playwright MCP Connection Status */}
      <div className="bg-white dark:bg-stone-800 rounded-lg shadow p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Playwright MCP Connection
          </h3>

          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              status.connected ? 'bg-green-500' :
              status.connecting ? 'bg-yellow-500 animate-pulse' :
              'bg-red-500'
            }`} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {status.connected ? 'Connected' :
               status.connecting ? 'Connecting...' :
               'Disconnected'}
            </span>
          </div>
        </div>

        {/* Extension Status */}
        {!status.extensionInstalled && (
          <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Extension Not Detected
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  Please install the Playwright MCP Bridge extension to use this feature.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {status.error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  Connection Error
                </p>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  {status.error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Connection Info */}
        {status.connected && status.connectedTabId && (
          <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  Connected to Browser Tab
                </p>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  Tab ID: {status.connectedTabId}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Connection Controls */}
        <div className="space-y-4">
          <div>
            <label htmlFor="mcpRelayUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              MCP Relay URL
            </label>
            <input
              type="text"
              id="mcpRelayUrl"
              value={mcpRelayUrl}
              onChange={(e) => setMcpRelayUrl(e.target.value)}
              disabled={status.connected || status.connecting}
              className="w-full px-4 py-2 border border-gray-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-stone-700 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-stone-800 disabled:cursor-not-allowed"
              placeholder="ws://localhost:3000"
            />
          </div>

          <div className="flex gap-3">
            {!status.connected ? (
              <button
                onClick={handleConnect}
                disabled={status.connecting || !status.extensionInstalled}
                className="flex-1 px-6 py-3 bg-stone-700 hover:bg-stone-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-stone-700 focus:ring-offset-2"
              >
                {status.connecting ? 'Connecting...' : 'Connect to Current Tab'}
              </button>
            ) : (
              <button
                onClick={handleDisconnect}
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Disconnect
              </button>
            )}
          </div>

          {/* Usage Instructions */}
          <div className="mt-4 p-4 bg-gray-50 dark:bg-stone-700/50 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>How to use:</strong>
            </p>
            <ol className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1 list-decimal list-inside">
              <li>Make sure the Playwright MCP Bridge extension is installed in Chrome</li>
              <li>Navigate to the tab you want to control in your browser</li>
              <li>Return to this dashboard tab</li>
              <li>Click "Connect to Current Tab" to establish connection</li>
              <li>The MCP server can now control that browser tab</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Applications
            </CardTitle>
            <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">1,234</div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Active Filters
            </CardTitle>
            <Activity className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">24</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Matched Jobs
            </CardTitle>
            <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">89</div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +8.2% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Success Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">72%</div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +5.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Data Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
          <CardDescription>
            A list of your recent job applications and their status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead className="text-right">Match Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Google</TableCell>
                <TableCell>Senior Software Engineer</TableCell>
                <TableCell>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                    Applied
                  </span>
                </TableCell>
                <TableCell>2024-01-15</TableCell>
                <TableCell className="text-right">95%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Microsoft</TableCell>
                <TableCell>Full Stack Developer</TableCell>
                <TableCell>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    Interview
                  </span>
                </TableCell>
                <TableCell>2024-01-14</TableCell>
                <TableCell className="text-right">88%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Amazon</TableCell>
                <TableCell>Backend Engineer</TableCell>
                <TableCell>
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                    Pending
                  </span>
                </TableCell>
                <TableCell>2024-01-13</TableCell>
                <TableCell className="text-right">82%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Meta</TableCell>
                <TableCell>Frontend Engineer</TableCell>
                <TableCell>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                    Applied
                  </span>
                </TableCell>
                <TableCell>2024-01-12</TableCell>
                <TableCell className="text-right">91%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Apple</TableCell>
                <TableCell>iOS Developer</TableCell>
                <TableCell>
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300">
                    Rejected
                  </span>
                </TableCell>
                <TableCell>2024-01-10</TableCell>
                <TableCell className="text-right">65%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
